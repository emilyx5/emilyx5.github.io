---
inProgress: false
title: WEBSITE BLOCKER BROWSER EXTENSION
date: 12 / 2023
description: a Chrome extension that blocks websites with a time-limit & reminder feature
img_alt: project image alt text
cover: 'public\assets\images\card\figma.png'
link: '/websiteblocker'
tags: ['2023','HTML', 'CSS', 'JS', 'figma', 'design','chrome API']
---
# 🛑 Website Blocker Extension 
»»-----------► a Chrome extension that blocks websites with a time-limit & reminder feature

---

## BLOCKING EXTENSION
This is a Chrome extension that helps users block websites of their choosing while maintaining flexibility, allowing them to temporarily unblock needed sites under a time-limit (+ with reminders!).

Why make this? While it's invariably true that many website blockers exist, I wanted to try the following:

1. learn how to code one myself using HTML, CSS, JS, and the Chrome APIs
2. implement some variability/adaptability to the blocking
3. design the interface with custom assets and prototyping on Figma

Expanding on the second list item: In my experience, I've found it a hassle having to unblock and block on other extensions. For example, YouTube is very distracting, but I often need it for learning purposes (and the extension doesn't know that). If I unblock the website, the risk of falling into the rabbit-hole of recommended videos while the ban is lifted is quite high, and it's unlikely I continue to use the extension after that...

That's why even though there are many extensions out there with stricter block policies, my goal was not to create a stronger restriction on users, but instead help them become more aware of where they spend their time and why. You can go on YouTube if you need, but the blocker makes sure that can't turn into a 3 hour mindless scrolling session.

## Features
I'll go through the process of using the extension, from adding a website to requesting temporary access.

### Blocking a Website
Upon loading and unpacking the extension (which can be found <a href="https://github.com/emilyx5/website-blocking-extension" >here</a>), clicking the popup lets the user add and remove websites to block.


<img src="public\assets\images\extension\popup.gif" class="bg-primary mb-1 size-fit outline-purple rounded-xl ">



Accessing any website with the blocked website's hostname will lead you to the following screen:


<img src="public\assets\images\extension\redirect.gif" class="bg-primary mb-1 size-fit outline-purple rounded-xl ">


Clicking 'close tab' closes the current tab, while clicking proceed brings you to the next screen

<img src="public\assets\images\extension\necessitycheck.gif" class="bg-primary mb-1 size-fit outline-purple rounded-xl  ">



Choosing 'No' closes the current tab again. In most cases, your journey ends here, and you resume browsing your unblocked websites.

### Accessing a Blocked Website
However, this user would very much like to use the blocked website, so they select 'Yes'' on the previous page, bringing them to the scroll of reason (boom effect)

<img src="public\assets\images\extension\scroll.gif" class="bg-primary mb-1 size-fit outline-purple rounded-xl ">

<div class="flex flex-row items-center">
<figure class="bg-white w-1/2 rotate-0 p-6 items-center justify-center hover:scale-150">
<img src="public\assets\images\extension\scroll.png" class="bg-primary mb-1 size-fit ">
<figcaption>final redirect confirmation page</figcaption>
</figure>

<p class="p-10 w-1/2">
Here, the user is prompted to fill out this scroll, detailing the reason for access and how long they think it'll take (this is the length that the unblock will last, after which, the extension will resume blocking the website).
<br>
<br>
They are also asked how many reminders they want; these reminders are notifications reminding them of the reason they were unblocking the site. Note: the user must fill this scroll out, or they are not allowed to proceed.
<br>
<br>
By making the process a little bit tedious, I wanted to make users more aware of what they planned to spend their time on. Too often have I found myself mindlessly clicking to YouTube without a goal in mind, and then coming back to reality many videos later, wondering what I was doing. It's a common tip in producitivity to always set goals before beginning a work session, and I wanted to promote that mindfulness here.
</p>
</div>

After filling the scroll out, the user is redirected to their original url.

<img src="public\assets\images\extension\unblock.gif" class="bg-primary mb-1 size-fit outline-purple rounded-xl ">


Intermittent notifications (however many you specified) will be sent to the user.
At the end of the alloted time, the page will be refreshed and redirect you to the original block page.
You are free to repeat the process for more time if you wish!

<img src="public\assets\images\extension\notif.png" class="bg-primary mb-1 size-fit outline-purple rounded-xl ">


## Design
As mentioned above, I wanted to design the interface with custom assets and learn how to prototype on Figma!

All of the images (the wizard, scroll, etc.) were drawn using https://www.pixilart.com/draw#, a free online site that was very convenient to use. I had never tried making pixel art, so this brief exploration was pretty fun.

The Figma draft prototype was also a great way to visualize the design I wanted for the extension. It seems half the trouble in working with HTML and CSS is knowing what kind of design you want. By using a resource like Figma, it makes things much simpler, as you're able to drag/drop items to rearrange into a design you like and view their code properties in the developer mode.

<figure class="bg-white size-fit rotate-0 p-6 items-center justify-center hover:scale-150">
<img src="public\assets\images\extension\figma.png" class="bg-primary mb-1 size-fit ">
<figcaption class='text-xl'>a screenshot from the figma draft</figcaption>
</figure>

---

# More Info

## File Structure
Here is the structure of the <a href="https://github.com/emilyx5/website-blocking-extension" >source code</a>:

```
│   manifest.json
│   README.md
│
├───background
│       background.js
│
├───images
│       icon-128.png
│       icon-16.png
│       icon-32.png
│       icon-48.png
│       necessitycheck.png
│       redirect.png
│       scroll.png
│       sparkle.png
│
├───popup
│       popup.css
│       popup.html
│       popup.js
│
└───redirects
        necessityCheck.html
        redirect.html
        redirect.js
        scroll.html
        style.css
```

### Overview

1. manifest.json:
    - A JSON (Javascript Object Notation) file that is required by every chrome extension
    - Details things like behaviour when clicking the extension action icon, version, permissions and background scripts
    - This is also where we register extension service workers (explained below), under the 'background' field
2. background.js:
    - Runs in the background and controls core logic
3. images/:
    - Directory containing all visual assets used in the extension
4. popup/:
    - Contains the styling and js files for the popup UI and functionality
5. redirects/:
    - Contains the styling and js files for the redirect UI and functionality

### Main concepts

#### **Event Handlers**
Event handlers are blocks of code (usually JS functions) that run when an event is fired. Events are things that occur in a system that trigger a notification so our code can react (via an event handler). For example, clicking a button can trigger an event handler to perform some logic.

> A code snippet from `popup.js` for updating the blocked websites list. An event listener is added to the delete-button on the blocked websites list. When a user clicks the button (an event), a function is deployed to remove the website from the list.

```javascript
function updateBlockedList(blockedSites){
        blockedSitesList.innerHTML = '';
        if (blockedSites.length == 0){
            blockedSitesList.innerHTML = '<p>No websites blocked! </p>'
        }
        else{
            blockedSites.forEach(function (site){
              const deleteButton = document.createElement('span');
              deleteButton.textContent = '-';
              deleteButton.className = 'delete-button';
    
              deleteButton.addEventListener('click', function () {
                const index = blockedSites.indexOf(site);
                if (index !== -1) {
                  chrome.storage.sync.get(['blockedSites'], function (result) {
                    const blockedSites = result.blockedSites || [];
                    blockedSites.splice(index, 1);
                    chrome.storage.sync.set({ blockedSites }, function () {
                      console.log(`${website} blocked.`);
                      updateBlockedList(blockedSites);
                    });
                  });
                }
              });
                const li = document.createElement("li");
                li.textContent = site;
                li.appendChild(deleteButton);
                blockedSitesList.appendChild(li);
            });
        }
    }
```

#### **Extension service workers**
Extension service workers are similar to event handlers, however the latter is tied moreso towards specific actions, like clicking buttons. They were introduced in Manifest v3 API (the latest verion of Chrome's extensions platform) to replace background scripts. These background scripts would run persistently in the background, taking up resources even when the extension wasn't in use. Service workers resolve this issue by being event-driven, and shutting down when not needed.

Extension service workers have to be registered in the manifest (under "background"):
```json
{
  "manifest_version": 3,
  "name": "Website Blocker!",
  "version": "0.0.1",
  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  },
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "16": "images/icon-16.png",
      "32": "images/icon-32.png",
      "48": "images/icon-48.png",
      "128": "images/icon-128.png"
    }
  },
  "permissions":[
    "webNavigation",
    "webRequest",
    "storage",
    "tabs",
    "notifications"
  ],
  "background": {
    "service_worker": "background/background.js"
  },
  "description":
    "Extension to block distracting websites while allowing temporary access with time limits + reminders!"
  
}
```

> `background.js` serves as a service worker, listening for events and performing tasks in the background for the extension. In this snippet, we use the `chrome.webNavigation` API to receive notifications about navigation. Before a user visits a site, a function is triggered to check whether the site we intend to visit is in the blocked websites list or the temporarily allowed list. 

```javascript
chrome.webNavigation.onBeforeNavigate.addListener(function (details) {

    chrome.storage.sync.get(['blockedSites'], function (result) {
      const blockedSites = result.blockedSites || [];
      const url = new URL(details.url);

      chrome.tabs.get(details.tabId, function (tab) {
        if(!(tab.url.includes('redirects/'))){
          const tabUrl = new URL(tab.url);

          if (blockedSites.includes(tabUrl.hostname)){
            chrome.storage.sync.get(['tempAllowed'], function(list){
                const tempAllowed = list.tempAllowed;
                if(!(tempAllowed.includes(tabUrl.hostname))){
                  chrome.tabs.update(details.tabId, { url: 'redirects/redirect.html' });
                  chrome.storage.sync.set({wantedSite: tab.url}, function () {
                    console.log('Original url is stored')
                  });
                }
            });
          }
        }
      });
    });
  });
```
#### **Content Scripts**
Content scripts are JS files that allow extensions to interact with a web page's Document Object Model (DOM). Put simply, the DOM represents everything on a web page, including text, images, buttons and other elements, as objects that we can access/modify. For example, a content script can read content and allow us to change the color of a button.

> `redirect.js` is a content script. At the top of the file, we have a line that listens for if the page content is fully loaded. 
  ```javascript
  document.addEventListener('DOMContentLoaded', function()...
  ```
> This snippet runs when the user fills out the scroll and attempts to proceed. It retrieves the content in the different elements and allows us to send an alert to the user if they have not filled everything out.

```javascript
    if(proceedButton){
        proceedButton.onclick = function(){
            const reason = document.getElementById('reason').value;
            const hours = document.getElementById('hours').value;
            const mins = document.getElementById('mins').value;
            const reminders = document.getElementById('reminders').value;
            const signature = document.getElementById('signature').value;

            if (reason && hours && mins && reminders && signature){
                const totalMins = hours*60 + mins*1;
                console.log(totalMins);
                const repeats = (totalMins/(reminders*1 + 1));
                console.log(repeats);
                
                openBlockedSite(reason, signature,reminders, repeats);
            }
            else{
                alert("Please fill in all fields!")
            }
        }
    }
```

#### **Asynchronous Messaging**
With all of these moving parts, we use asynchronous messaging to coordinate and communicate between components. For example, this function from the `redirect.js` content script allows us to send a message to the extension service worker script `background.js` with the user info from the scroll when they are given access to the blocked site.

```js
    async function openBlockedSite(reason, signature, reminders, repeats){
        const url = await getBlockedSite();
        console.log('Stored Tab URL:', url);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.update(tabs[0].id, { url: url });
            chrome.runtime.sendMessage({ command: "loop" , params:{
                i : 0,
                reason : reason,
                signature : signature,
                reminders : reminders,
                repeats : repeats
            }
          });
        }); 
      }

```
In `background.js` a listener waits for a message from the content script and passes the information to the `loop` function, where reminders are sent until the duration of the temporary access is reached.

```js
  function loop(i, reason, signature, reminders, repeats) {         
    setTimeout(function() {  
      console.log(i, reason, signature, reminders, repeats);
      if(i == reminders){
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.remove(tabs[0].id);
          });
          chrome.storage.sync.set({tempAllowed: []}, function(){
              console.log(`Temporary websites cleared.`);
          }); 
          i++;
      }    
      else{
          chrome.notifications.create('notif', {
              type: 'basic',
              iconUrl: '../images/icon-32.png',
              title: 'Hi ' + signature+ ', are you still on track?',
              message: "Make sure you are still unblocking for this reason! \n" + "You wrote: " + reason
          })
          i++;
          console.log(1000*(repeats*60));
  
          if (i <= reminders+1) { 
              chrome.notifications.clear('notif')         
              loop(i, reason, signature, reminders, repeats);             
          } 
      }                     
    }, 1000*(repeats*60)) 
  }

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command === "loop") {
      loop(request.params.i, request.params.reason, request.params.signature, request.params.reminders, request.params.repeats);
    }
  });
```

---
