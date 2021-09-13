import ForgeUI, {render, useState, useEffect, useProductContext, Fragment, Text, Button, ButtonSet,  SpacePage, Avatar, User, UserGroup, Tooltip, Form, Table, Head, Cell, Row, TextArea, StatusLozenge, Badge, Link, Strong, Image, Heading, Toggle} from '@forge/ui';

export const vars = {
  
    // TODO: parse user input via select input element
    // temp hardcoded placeholder
    groupName: 'Marketing Team', 

    navItems: ['Members', 'Company Tree', 'My Progress', 'Minutes + Memos', 'Training + Feedback'],

    CALENDLY_USER: 'codegeist-2021', // TODO: store as env variable

    // Hardcoded placeholders
    jobTitlesList: ['CEO & Founder', 'Junior SEO Marketer', 'Senior SEO Marketer', 'Marketing Director', 'UX Researcher', 'Senior SEM Manager', 'SEO Manager', 'Chief Marketing Officer (CMO)', 'Affiliate Ads Specialist'], // temp placeholder

    timeRemaining: 1320, // temp placeholder (in seconds)
    measureofTime: 'minutes', // temp placeholder

    // interval [startTime, endTime]
    daytime: [4, 7], // 4am - 7pm
    nightTime: [7, 4] // 7pm - 4am

	   
}

    /* TODO: emojis -> HTML entities ? */
    export const memos = ['Bathroom break 💩', 'Coffee break ☕️', 'Out sick 🤒', 'Out of office', `📵 In a meeting - I'll be back in ${format(vars.timeRemaining)} ${vars.measureofTime}!`, `📵 On a client call  - I'll be back in ${format(vars.timeRemaining)} ${vars.measureofTime}!`, 'PTO - vacay 😎 🏖 (see my calendar for availability)', 'business trip 💼 ✈️', 'Off work ✌️', 'In the zone - in deep concentration 👨🏻🧘🏻‍♀️'] 

    // placeholder method - needs revision ofc
    function format(timeinSeconds) {
        return (timeinSeconds / 60);
    }