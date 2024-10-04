---
inProgress: false
title: MARIO KART ROBOT
date: 08 / 2023
cover: 'public\assets\images\card\delicious.png'
description: a 6 week team project to build an autonomous driving robot!
link: '/autonomousrobot'
tags: ['2023','design','cad', 'soldering', 'rapid prototyping']
---

# 🤖 Mario Kart Robot Competition
»»-----------► A 6 week team project to build an autonomous driving robot!


---
## THE COMPETITION
2nd Year Engineering Physics students take a 6-week course called *ENPH 253: Introduction to Instrument Design*, where we group up into teams of 4 and are tasked with designing and building a fully autonomous robot from scratch. 

At the end of this course, teams face off in a live competition to see which robot performs the best. 

 - Every year's competition is livestreamed on YouTube! Embeds do not work unfortunately (copyrighted music), so **click the image below** to watch our year's competition! Our robot races at around 1:07:00 and 1:33:00. You can also scroll to the end of the page to see a gif.

<div class="flex flex-row items-center">
<figure class="bg-white size-fit rotate-1 pt-2 pb-8 p-4 items-center justify-center hover:scale-150">
<a href="https://www.youtube.com/watch?v=gXMnazr8vEo"><img src="public\assets\images\robotcomp\youtube.png" class="bg-primary mb-1 size-fit "> </a>
<figcaption class="pt-2 text-black text-xl text-center">click here to see the youtube video!</figcaption>
</figure>

<figure class="bg-white size-fit -rotate-6 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\delicious.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-xl text-center">our robot, named "deliciousness overload"</figcaption>
</figure>
</div>

The theme of the competition varies each year (examples include Indiana Jones, Avengers, and the game Overcooked), and for us, our theme was Mario Kart!

### THE RULES
A simplified summary of the rules is as follows:
1. Each team builds on robot to race around the track and collect as many points as possible
2. 2 robots will race on the same track at the same time in a 1V1 tournament bracket style competition
3. Inter-robot violence is against the rules, but other forms of aggression are permitted
4. Points can be earned/lost via the following methods:
    a. Lap completion: +3 points
    b. Picking up blocks on the track: +1 points
    c. Picking up coins on the zipline: +1 points
    d. Picking up a magnetic "bomb"-block results in a position reset and a loss of points collected that lap

The full rule documentation can be found <a href="https://docs.google.com/document/d/e/2PACX-1vS4bQXNVCvEt-UMX50Rsar0Wds5AqRDQToN8ABxkS7ocnluPU8JlCNRYIkiXptbHYsrAI_WKzwC9IwO/pub">here</a>

### THE TRACK
This is the map of the competition track:


<img src="public\assets\images\robotcomp\competitionSurface.png" class="bg-primary mb-1 size-fit outline-2 outline-orange shadow-2xl shadow-orange">


It's up to teams to decide which route they want to take, like using the IR beacon to cut across the map or taking the zipline and snatching coins. Our initial gameplan involved jumping off the ramp, but we eventually opted to do laps around the track normally, no zipline or IR. A little boring, I know, but simplicity and consistency were our priorities (something that works > something fancy, in this case).


## MAKING THE ROBOT
#### DESIGNS
Our initial designs were pretty complex, with lots of sensors and moving parts, but as we progressed through the design phase and moved to actually building the different parts, we figured it was best to keep things simple. With a solid driving foundation, the other features were not necessary and were minimized to avoid risks. 
<div class="flex flex-row">
<figure class="bg-slate-100 rotate-1 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\sensordesign.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">slides from our design proposal (1/2)</figcaption>
</figure>

<figure class="bg-slate-100 -rotate-2 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\sensordesign2.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">slides from our design proposal (2/2)</figcaption>
</figure>
</div>

#### BUILDING
I made a rough claw prototype using an Arduino kit at home, programming a servo motor to close at a certain distance, though the ultrasonic sensor was rather inconsistent and was later removed from the design as we didn't need it. Using spare parts in the lab, I also made a rough chassis to get a sense of the structure and layout. There were some size constraints in the rules, but it didn't prove to be much of a problem.

<div class="flex flex-row">

<figure class="bg-slate-100 size-fit rotate-1 pt-8 pb-4 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\clawPrototype.gif" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm"> arduino claw</figcaption>
</figure>

<figure class="bg-slate-100 size-fit mb-24 rotate-3 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\robotProto.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">prototype chassis (1/2)</figcaption>
</figure>

<figure class="bg-slate-100 size-fit -rotate-2 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\cardboardProto.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">ultrasonic sensor testing</figcaption>
</figure>

<figure class="bg-slate-100 size-fit mb-24 rotate-3 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\robotProto2.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">prototype chassis (2/2)</figcaption>
</figure>

</div>


This was later developed into a CAD model on OnShape, after which we produced 2 design iterations, the second being the final build you see in the competition video. 

<div class="flex flex-row">

<figure class="bg-slate-100 size-fit rotate-1 pt-8 pb-4 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\robotwheel.gif" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">bottom of the robot; wheel mounts + steering system</figcaption>
</figure>

<figure class="bg-slate-100 size-fit mb-24 rotate-3 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\robot360.gif" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">full chassis + circuitry layout; layers attached using stands</figcaption>
</figure>

<figure class="bg-slate-100 size-fit -rotate-2 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\robotclawCAD.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">robot claw (scrapped)... those gears are so small...</figcaption>
</figure>
</div>

The laser-cutting machine was a highly sought after commodity throughout the course! We got a taste of cheap, high-speed factory production... this was the industrial revolution... I had taken a course on <a href="\metalphonestand">machine shop training</a> to prep for this, but the laser cutter was simply too convenient. 

<figure class="bg-white size-fit  pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\assembly.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-md">assembly of our first prototype, primarily made of laser-cut hardboard pieces</figcaption>
</figure>


#### DRIVING

To drive around the course, we implemented a navigation system via tape following. The track has black tape laid out for a standard-lap path, and by using reflectance sensors, which provide information on the robots position relative to the tape-road, we could program a PID system to drive around.

<div class="flex flex-row">

<figure class="bg-slate-100 size-fit rotate-1 pt-8 pb-4 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\breadboard.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">testing on a breadboard...</figcaption>
</figure>

<figure class="bg-slate-100 size-fit mb-24 -rotate-3 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\circuits.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">sensor circuit diagrams from our design slides</figcaption>
</figure>

<figure class="bg-slate-100 size-fit rotate-2 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\solder.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">learning to solder (only mount fujis allowed)</figcaption>
</figure>
</div>
 
At this point, it was getting late into the course, and time was ticking away... Our driving mechanisms were looking pretty good thanks to the hard work of everyone on the team, and our robot was steadily completing laps. Here's a video from one of our driving tests, slowed down (it took many many days of tuning the driving parameters...). The front wheels were sagging quite a bit here, but we fixed it later on with some O-rings from the lab, which held the wheel pins straight via tension.


<video class="size-fit" controls autoplay muted>
    <source src="public\assets\images\robotcomp\robotdriving.mp4" type="video/mp4">
</video>

Since most teams hadn't finished their driving systems yet, we were content with the points collection system we had currently (doing laps). To avoid risking breaking the systems we had, we decided not to implement a block collection system (rip to the claw) or the jumping off ramp idea, as this could displace the IR sensor positions, which would heavily affect PID tuning.

I don't have many good photos but during the last week, I added a bumper out of a metal sheet (with a smiley face!) that was fastened with zipties to our chassis. This helped the robot push away any blocks and potential magnetic bombs without tipping them over (which would cause them to blow up), also provided some level of protection for the sensors against collisions.

<div class="flex flex-row items-center">
<figure class="bg-slate-100 size-fit rotate-2 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\bumper.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">a last-minute addition; bumper plate made out of scrap sheet metal and a tongue/feet made of plastic to help scrape away potential bombs... also some drawings for extra style(?) points</figcaption>
</figure>

<figure class="bg-slate-100 size-fit -rotate-2 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\labelleddiagram.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">final diagram with all the major components</figcaption>
</figure>
</div>

## RESULTS

Alas, competition day came (once again, available on YouTube <a href="https://www.youtube.com/watch?v=gXMnazr8vEo">here</a>). Our robot performed wonderfully and I'm happy to say that our team's robot made it past the group stage and into the finals! It was definitely a fun learning experience and I send my appreciation to the lab instructors, who supported us throughout the process. 

<div class="flex flex-row items-center">
<figure class="bg-slate-100 size-fit rotate-2 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\final.png" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">deliciousness overload, minutes before competing in UBC's HEBB theatre</figcaption>
</figure>
<figure class="bg-slate-100 size-fit -rotate-4 pt-8 pb-8 p-4 items-center justify-center hover:scale-150">
<img src="public\assets\images\robotcomp\driving.gif" class="bg-primary mb-1 size-fit ">
<figcaption class="pt-2 text-black text-sm">deliciousness overload speeding through the tracks!</figcaption>
</figure>
</div>

---

