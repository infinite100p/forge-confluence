# Forge Confluence Teams

## Inception
Forge Confluence project hacked together during the final week of the Codegeist 2021 hackathon.

## Installation
1. Clone this repository
2. Run `forge register` in the terminal to register a new copy of this app to your developer account
3. Run `npm run install-all` from the root directory to install all dependencies
4. Run `forge deploy` to deploy the app
5. Run `forge install` and follow the prompts to install the app
6. Review requested permissions and grant authorization to the app from your Atlassian account

[//]: # (6. Set environment variables)

## Video Demo
[![Forge Demo](./imgs/video-thumbnail.png)](https://youtu.be/raXiipbGE1g)

## Blockers, Challenges, Limitations
I was unable to obtain access to Atlassian's User Management REST API, which requires domain ownership verification (not enough time to verify as I realized this < 24 hours before the deadline). All of my "organization's" user accounts are linked to disposable email addresses on a domain that I don't own but that I also can't change (see `bugs + feedback/bugs.txt` & `imgs/screenshots` for 400 change-email error documentation). However, this is more than likely due to browser cookies/cache issue on my end which I still need to resolve. Requests to fetch scheduled events data from Calendly's API were also unsuccessful. So basically, I couldn't get the core APIs that I needed to implement to work... 👏

As a workaround, some User object property values (like user job titles, time zones, status messages, and 3rd party account credentials) were hard-coded and (overly) simplified for demo purposes. Also, since the Forge Cloud APIs don't support user account creation, I had to manually create each individual user account with a cap at 10 users under Atlassian's Free plan. Confluence Cloud & UI Kit limits the ability to style, position, and render elements outside of their designated components, which makes it difficult (impossible?) to achieve a desirable UI design for Forge Cloud apps. I couldn't figure out how to update the LookAndFeel settings with Forge. If I could get that to work, the Confluence space could look nicer.

Also could not get `forge tunnel` to run, so I was stuck with running `forge deploy` after every code change. Slow + tedious process. 10/10 would not recommend. Great way to test your patience. Need to learn how to use Docker.

## Experience + Reflection
I'm not sure how I feel about this entry. On one hand, I've created nothing useful or functional by the end of the hackathon. Just a mockup that is nowhere near complete. On the other hand, I made it further than I thought I would. 

In hindsight, this was not a solid idea to pursue. I'm doubting whether there is even a business need for such features. And apparently, Atlassian Confluence Team spaces is already a thing, as I've only just discovered. So my idea could very well be a duplicate of something that already exists, oops. Another idea scrapped.

## Ending Notes + Takeaway
> "Until you understand your customers - deeply and genuinely - you cannot truly serve them." - Rasheed Ogunlaru

> "You have to understand your customers' needs before they understand your technologies." - Steven Haines

In order to create something of value for users, one ought to be able to put themselves in the users' shoes. The best way to do that is to be a user. Longtime Atlassian users who belong to companies and organizations that rely on these tools as part of their daily workflows would be ideal ideators & developers, as they are already familiar with the user experience & pain points. 

From what I understand, Atlassian is a software-first, agile project management driven ecosystem - an interesting but alien concept to me. I realized that I didn't know enough about Jira workflows and the whole agile/scrum methodology to build a Jira app, so I switched to Confluence, which is simpler to grasp for a non-developer/non-project manager like myself. It would take more than a week to properly learn and understand, and even then, I don't think this is something anyone can just pick up without the lived experience of working in a team that follows this specific model or way of collaboration. 

So if my project failed to address the contest challenge, this is why. It's difficult to ideate, design and develop an innovative app that doesn't already exist in the Marketplace for Atlassian teams, while knowing next to nothing about the platform, how it operates, and how exactly different teams collaborate internally. Reading community forums is not enough when you don't know what you are supposed to be searching for. Information overload paired with a very limited understanding of technical terminology and workflow processes in real world workforce scenarios == no bueno. One week was certainly not enough time for a non-developer like myself to wrap my head around.

![confusion](imgs/confused-giphy.gif)

In conclusion, even though my Forge proof of concept is severely lacking, I am at least a little less confused than I was last week.

## Submission Category
	Apps for Business
