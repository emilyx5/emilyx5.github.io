---
inProgress: false
title: SIMULATED DRIVING DETECTIVE
description: a simulated car capable of navigating roads/obstacles and reading!
cover: '\images\card\hsvroad.png'
img_alt: project image alt text
link: '/drivingdetective'
tags: ['2024', 'AI/ML','Python', 'Linux', 'ROS', 'image processing']
---
# 🕵️ Simulated Driving Detective
»»-----------► a simulated car capable of navigating roads/obstacles and reading!

---

# The Course

In <a href = "https://projectlab.engphys.ubc.ca/enph-353/" > ENPH 353</a>, students complete labs revolving around the following topics:
- Linux fundamentals
- Image Processing
- ROS/Gazebo
- Neural Networks
- Computer Vision
- Reinforcement Learning

As a final project, students team up in pairs to program a simulated robot car to drive around a course in Gazebo, using CV and ML techniques for image recognition and navigation!

## Competition Surface

The image below is a top-down view of the competition surface, simulated in Gazebo. It features a road/pavement section and a grassy desert portion. Moving obstacles such as pedestrians, trucks and 'baby yoda' travel pre-set paths periodically. Clueboards are placed throughout the track, each containing a randomized 'clue' that is to be 'read' via computer vision and submitted to a clue checker for points. Points are awarded based on clueboard recognition and deducted based on navigation ability.

<img src="\images\353\competitionsurface.png" class="bg-primary mb-1 size-fit ">


## Technologies Used
Some notes I took while learning about the technologies used for the competition:

---
### ROS & Gazebo
>The environment and framework used for this competition are ROS and Gazebo. 

### What is ROS?

ROS stands for Robot Operating System, and provides libraries/tools for developing robot applications. Our model is a simple car, though ROS is also used for much more complex robotics systems.

Some basic info on the structure of ROS:

#### Nodes
The ROS system is made up of smaller programs/nodes. These nodes are designed for specific tasks such as reading sensor data, communicating with other systems, or motor control. Nodes can run on one computer or others on the same network, allowing for flexibility and distributed computing on different machines. 

#### Topics and Messages
Nodes communicate via topics and messages. Topics are a named location that one/more nodes can publish a message to. If a node publishes to a topic, it is a publisher, whereas nodes that receive information are subscribers. For single node to node communication, we can use services. 

This subscriber/publisher model allows us to publish our image recognition results to a 'score' topic, which is used to calculate final points. A publisher node can publish movement commands, allowing us to move the vehicle.

This is how the main node file looked early on:
```py
#!/usr/bin/env python3 

from __future__ import print_function
from std_msgs.msg import String

import roslib
import sys
import rospy
import cv2
from std_msgs.msg import String
from sensor_msgs.msg import Image
from cv_bridge import CvBridge, CvBridgeError
from rosgraph_msgs.msg import Clock
from geometry_msgs.msg import Twist
import numpy as np

class Signals:

    def __init__(self):
       self.move = rospy.Publisher("/R1/cmd_vel",Twist,queue_size=1)
       self.score = rospy.Publisher("/score_tracker",String, queue_size=1)
       self.clock = rospy.Subscriber("/clock",Clock, queue_size=10)

def main(args):
    comms = Signals()
    rospy.init_node('node', anonymous=True)

    move = Twist()
    move.linear.x = 0.5

    rospy.sleep(1)
    comms.score.publish(str("FANUM,WAGON,0,NA"))
    comms.move.publish(move)
    rospy.sleep(5)
    comms.score.publish(str("FANUM,WAGON,-1,NA"))

    try:
        rospy.spin()
    except KeyboardInterrupt:
        print("Shutting down")
    cv2.destroyAllWindows()

if __name__=='__main__':
    main(sys.argv)
```

For reference, the score tracker system recieves strings from the `comms.store.publish()` method, filling in this GUI with our predicted clues:

<img src="\images\353\scoreboard.png" class="bg-primary mb-1 size-fit ">

Points are awarded if the predicted value matches the corresponding clue value.

### What is Gazebo?

Gazebo, on the other hand is a simulation tool that lets us visualize applications in a 3D environment.
It is integrated with ROS via plugins, the ROS topics/services that Gazebo can also interact with and simulated ROS nodes. Gazebo lets us simulate sensors, like cameras, that we use for our CV. 

<figure class="bg-white size-fit -rotate-0 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="\images\353\gazebo.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-md text-center">screenshot of the Gazebo environment from an RL lab</figcaption>
</figure>

### Pytorch/Keras
On the machine learning side of things, we use Keras. Keras is an open source ML library built ontop of TensorFlow that is one of the most widely used libraries (the other being PyTorch). Using Keras/Tensorflow, we can customize and train neural networks in a Python notebook.

### Convolutional Neural Network
> We use a Convolution Neural Network (CNN) to identify alpha-numeric characters on a clueboard, generating a 'predicted' clue. 

#### What is a Neural Network
Firstly, what is a neural network (NN)? The name 'neural network' comes from its structure, which is inspired by the human brain and its network of neurons. The implementation of a NN has less to do with biology than it does math (see this <a href = "https://www.youtube.com/watch?v=VMj-3S1tku0">tutorial</a> for more info on the inner workings, also highly recommend the 3B1B videos). 

Each NN has layers made up of units called neurons/nodes. Each NN has an input layer (where info is input), hidden layers (where the analysis happens) and an output layer (the result). Nodes are connected to one another, with each connection having a weight value. Nodes have their own biases as well, and a pre-set activation function (math) that decides whether or not to pass information to the next neuron. These parameters are tuned during the learning process, where the NN picks up patterns in data.  

<figure class="bg-white size-fit -rotate-0 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="\images\353\nn.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-md text-center">diagram of a neural network architecture from <a href="https://link.springer.com/article/10.1007/s10462-021-10049-5">this article</a> </figcaption>
</figure>



#### What is a CNN
A Convolution Neural Network (CNN) is a specific type of NN used commonly for classification and CV tasks. CNNs use matrix multplication to identify patterns in images, a computationally expensive task often requiring GPUs/TPUs. As mentioned above, NNs are made up of layers. CNNs in particular have 3 types of layers:

1. Convolutional Layer:
    - This is where the majority of the computation happens
    - Input data is stored as a 'cube', with height, width and depth representing the RGB values in an image
    - A kernel/filter/feature detector slides across the fields of the image
        - This is the 'convolution' that checks for whether or not a feature is present
        - The kernel/filter itself is a 2D array of weights
        - As the kernel/filter slides across the image data, the dot product is computed and stored in a feature map
    - After each convolution, a rectified linear unit (ReLu) activation function is applied to the feature map

<figure class="bg-white size-fit -rotate-0 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="\images\353\convolution.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-md text-center">diagram of the convolution process from <a href="https://www.ibm.com/topics/convolutional-neural-networks">IBM</a> </figcaption>
</figure>


2. Pooling Layer:
    - This layer reduces the number of parameters in an input, reducing complexity and limiting the risk of overfitting
    - 2 main types of pooling layers:
        1. Max Pooling: filter moves across an input, selects the pixel with the max value to be sent to the output array
        2. Average Pooling: filter moves across an input and the calculated average is sent to the output array
3. Fully-Connected Layer
    - This allows for classification based on features extracted through previous layers and different filters, producing a set of probabilities
    - Usually leverages softmax activation functions that normalizes the output probabilities to be between [0,1]

> This is the code written to set up the CNN, using Keras/TensorFlow libraries. Each layer is added manually. Main parameters include the activation function to be used and input image shape. The last few lines of code is where the training of the model happens. 
```python
# defining the model
conv_model = models.Sequential()
conv_model.add(layers.Conv2D(32,(3,3),activation='relu', input_shape=(100, 39, 1)))
conv_model.add(layers.MaxPooling2D((2,2)))
conv_model.add(layers.Conv2D(64,(3,3), activation='relu'))
conv_model.add(layers.MaxPooling2D((2,2)))
conv_model.add(layers.Conv2D(128,(3,3), activation='relu'))
conv_model.add(layers.MaxPooling2D((2,2)))
conv_model.add(layers.Conv2D(128,(3,3), activation='relu'))
conv_model.add(layers.Flatten())
conv_model.add(layers.Dropout(0.5))
conv_model.add(layers.Dense(512, activation='relu'))
conv_model.add(layers.Dense(36, activation='softmax'))

# use categorical cross entropy function for multiple classes
LEARNING_RATE = 1e-4
conv_model.compile(loss='categorical_crossentropy', optimizer=optimizers.RMSprop(learning_rate=LEARNING_RATE),metrics=['acc'])
reset_weights(conv_model)
# training the model
history_conv = conv_model.fit(np.array(Xdata), np.array(Ydata),validation_split=0.2, epochs=80, batch_size=16)
conv_model.summary()
```

## Competition Strategy
With some background info established, I will go over the explanations of the system from our final lab report I completed with my teammate! As a refresher, the goal of the final compeition is to program a car capable of the following:

1. Driving autonomously through the simulated competition track in Gazebo. This includes:
    a. Ability to detect road lines and stay within them
    b. Ability to detect moving obstacles and not hit them while obeying a.

2. Read clues from a clueboard. This includes:
    a. Ability to detect the presence of a clueboard
    b. Ability to read only the clue on the clueboard, with 100% accuracy
    c. Submission of the predicted clue to the scoreboard topic

Fyi the name of our car is Fanum Wagon, reasons for which were never fully discussed. The below is a flowchart of our implemented logic.

<img src="\images\353\logic.png" class="bg-primary mb-1 size-fit ">


### Driving
<figure class="bg-white size-fit -rotate-0 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="\images\353\plainroad.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-md text-center">camera view of the car from the starting position</figcaption>
</figure>

A driving system was implemented using line detection and proportional error feedback (how much we correct the velocity is proportional to how far we are from the center of the road). HSV thresholds were used to apply image masks and isolate road lines, through which different move instructions were published to the cmd_vel topic based on detection cases and calculated error. Road thresholds and logic were split between the initial pavement section and grass (hill + flat were separated, though only the flat was used in the final competition). Driving logic was switched via an ongoing section counter. Section lines were detected via thresholding and area filtering and a counter was incremented whenever a new line was seen.

<figure class="bg-white size-fit -rotate-0 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="\images\353\hsvroad.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-md text-center">hsv thresholding for different portions of the track</figcaption>
</figure>

##### Pavement
For the pavement portion, camera feed was filtered for white lines residing in the bottom 65% of the screen (to avoid upcoming turns from affecting centre calculations) with contour area greater than 5000 (for cleaner lines). The remaining contours were reduced to the x-coordinate of their centre of mass (CMx), which was then stored in a list for centre of road calculation.  To find the centre of road, we divide the CMxs into 2 groups: ones which fell on the left side of the screen vs. the right. Averaging the CMxs on each side first before taking an overall average of the left and right CMx, we get the calculated centre of the road. Note that we only concern ourselves with the x-position.

<figure class="bg-white size-fit -rotate-0 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="\images\353\pavementdriving.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-md text-center">logic flowchart for driving on pavement!</figcaption>
</figure>

##### Grass
For the grass portion, contour filtering largely follows the pavement logic, however, due to the nature of the HSV thresholding, it is difficult to get the large, clean contours we saw in the previous section. A different system is implemented here, where we retrieve the middle Y coordinate of every contour and assign it either (+) for left-side or (-) for right side. We append these coordinates to a list and based on the sign of the resulting sum, gain insight into which side has lower contours (lower = higher values = dominating sign). If a side has a lower contour, we interpret it to be seeing “less” and turn towards the side to adjust. This naturally leads the robot to ‘latch’ onto a single line and focus on clearer readings. 

<figure class="bg-white size-fit -rotate-0 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="\images\353\grassdriving.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-md text-center">logic flowchart for driving on grass!</figcaption>
</figure>

#### Obstacle Detection
Obstacle detection was handled by looking for movement. After stopping the robot at a point of interest, we are able to compare the current frame of the camera with the previous frame using subtraction. By subtracting the current frame from the previous frame (using the `cv2.absdiff()` function), the pixels that have not changed will be black, while the pixels that have changed will keep some colour.

<figure class="bg-white size-fit -rotate-0 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="\images\353\obstacle.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-md text-center">result of subtraction of frames; the motion of both the pedestrian and the truck can be seen</figcaption>
</figure>

We can then apply a binary mask to this image, giving us a fully black and white result. From the binary image, we can convert the image into a numPy array using the `np.toArr()` function, which makes it very easy to count the number of white pixels through the use of the `np.count_nonzero()` function. When we find a count above a certain number of pixels, we can be confident that the motion is caused by the closest object, and not by noise or an object that is further away.

<figure class="bg-white size-fit -rotate-0 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="\images\353\binaryobstacle.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-md text-center">result after applying a binary mask</figcaption>
</figure>

### Clueboard Identification

<figure class="bg-white size-fit -rotate-0 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="\images\353\clueboards.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-md text-center">some of the clueboards along the competition track</figcaption>
</figure>

#### Clubeoard Detection

To detect the clueboards as a whole, we were able to filter for the blue of the clueboard and find its contours. However, there are often multiple contours for this colour that are present that come from other boards in frame, the letters on the board, and so on. To solve this problem, we set a variable bigC to be the first contour in the array of contours produced. We can then iterate through this array, setting bigC to the current contour if its area is greater than `bigC` ‘s current contour area. By doing this, we end up with bigC being equal to the largest contour on screen, which should be the signboard closest to the vehicle.

From this point, we can use the function `cv2.approxPolyDP()` in order to receive a polygonal approximation of the contour. From this polygon, we extract the vertices.  The clueboard is rectangular, so we are only interested in this polygonal approximation if it has 4 vertices, and if the vertices are a certain distance apart from each other, ensuring that we are close to the board and can get a clear view. If these conditions are met, we can proceed to sort the vertices, ensuring that they are in a consistent order. This is done by finding the average x and y coordinates of the vertices, essentially finding their centroid. From here, we know that the top right vertex will be the vertex which has an x coordinate > centroid and y coordinate < centroid, and so on. Once we have our vertices sorted, we can use `cv2.getPerspectiveTransform()` and `cv2.warpPerspective()` to generate our clueboard. 

<figure class="bg-white size-fit -rotate-0 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="\images\353\extractedclueboard.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-md text-center">extracted image of clueboard</figcaption>
</figure>

To extract the letters from the clueboard, we first perform some processing on the clueboard image. We are only interested in the clue itself, so we can crop the image into a thin strip that only contains the clue. We can then sharpen the image by using a technique known as unsharp masking. This involves using `cv2.GaussianBlur()` to blur a grayscale version of our clueboard image, and then using the `cv2.addWeighted()` function as well as the `cv2.threshold()` function to output a new, sharper binary image. We can then use this binary image to draw the contours of the letters.

<figure class="bg-white size-fit -rotate-0 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="\images\353\extractedword.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-md text-center">cropped image with contours, as well as the sharpened binary image</figcaption>
</figure>

Once we have the contours, getting the individual letters can be done fairly easily. First, we can use `cv2.boundingRect()` to get the bounding box of each letter. We can then sort the list of contours by the x-coordinate of the top left point of their bounding box. This ensures that our letters will be in order from left to right. After that, we can simply crop the image based on the coordinates of the bounding box, giving us a letter.

<figure class="bg-white size-fit -rotate-0 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="\images\353\D.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-md text-center">the letter “D” snipped from the word “HERD”</figcaption>
</figure>

#### CNN Training
To generate data, we modified previous lab code and the `plate.generator.py` script that was provided in the competition repo for clueboard generation. The same base plate and font was used to generate fake clueboards, each with a single character, varied via `datagen=ImageDataGenerator(rotation_range=0, zoom_range=0.001, brightness_range=[0.4, 0.5])` and encoded via oneHot vectors that are stored pairwise to the image matrices. A random blur of range (8,12) was applied via `cv2.blur` and the image was spliced to contain only the letter. `cv2.GaussianBlur(img,(0,0),3)` is applied alongside the standard processing described in Letter Extraction to get the appropriate contours in the spliced image. This is then repeated 50 times per character (letters + digits [0,9]) to get an even distribution of varied training data.

<img src="\images\353\cnntraining.png" class="bg-primary mb-1 size-fit ">

The model summary:
```

    Model: "sequential"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 conv2d (Conv2D)             (None, 98, 37, 32)        320       
                                                                 
 max_pooling2d (MaxPooling2D  (None, 49, 18, 32)       0         
 )                                                               
                                                                 
 conv2d_1 (Conv2D)           (None, 47, 16, 64)        18496     
                                                                 
 max_pooling2d_1 (MaxPooling  (None, 23, 8, 64)        0         
 2D)                                                             
                                                                 
 conv2d_2 (Conv2D)           (None, 21, 6, 128)        73856     
                                                                 
 max_pooling2d_2 (MaxPooling  (None, 10, 3, 128)       0         
 2D)                                                             
                                                                 
 conv2d_3 (Conv2D)           (None, 8, 1, 128)         147584    
                                                                 
 flatten (Flatten)           (None, 1024)              0         
                                                                 
 dropout (Dropout)           (None, 1024)              0         
                                                                 
 dense (Dense)               (None, 512)               524800    
                                                                 
 dense_1 (Dense)             (None, 36)                18468     
                                                                 
=================================================================
Total params: 783,524
Trainable params: 783,524
Non-trainable params: 0
_________________________________________________________________
```
<a href="https://colab.research.google.com/drive/1ZrZXMVHGvRCtD3oxwF5cYXK9YwWTHgJ2?usp=sharing"> Click here to view the notebook with all the code/graphs </a>
## Results
I am happy to say that we were able to score within the top 5 teams at the competition, and the CNN read each clueboard perfectly! There were some downsides, since due to time constraints we had to sacrifice points by implementing teleports at specific map points. Because each team only had one 'try', consistency was our first priority, so the riskier parts of the map where the robot drove off course were skipped. Overall though, we were still ultimately pleased with our robot's performance, and happy with the knowledge and experience we received from working on the project.

Here's a gif of our car running on part of the track (sorry it's not higher quality... this was filmed during an all nighter..)!
<img src="\images\353\driving.gif" class="bg-primary mb-1 size-fit ">

---

