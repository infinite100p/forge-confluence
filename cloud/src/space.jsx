import ForgeUI, {render, useState, useEffect, useProductContext, Fragment, Text, Button, ButtonSet,  SpacePage, Avatar, User, UserGroup, Tooltip, Form, Table, Head, Cell, Row, TextArea, StatusLozenge, Badge, Link, Strong, Image, Heading, Toggle, SectionMessage} from '@forge/ui';
import {getGroups, getGroupMembers, getAccountIds, getMemberAccountIds, getSpace} from './getters.js';
// import {renderMembers} from './members.jsx'
// import '../node_modules/font-awesome/css/font-awesome.min.css'; 

/* 
   Note to any dev who sees this code: apologies for the spaghetti code. 
   Code needs to be cleaned up, reformatted, and refactored with comments.
   I'm not a developer so idk how to produce professional, clean code. 
   I just know that it's an ugly sight & a real pain to read aha sorry!
*/
const App = () => {
    const context = useProductContext();
    const { accountId, spaceKey, contentId, extensionContext } = context;
    // const [style, setStyle] = useState({});
    const [groups, setGroups] = useState({});
    const [groupMembers, setGroupMembers] = useState({});
    const [accountIds, setAccountIds] = useState([]);
    const [userProfiles, setUserProfiles] = useState([]);
    const [selectedView, setSelectedView] = useState([]);
    
    // TODO: parse user input via select input element
    // temp hardcoded placeholder
    const groupName = 'Marketing Team'; 

    const navItems = ['Members', 'Company Tree', 'My Progress', 'Minutes + Memos', 'Training + Feedback'];

    const CALENDLY_USER = 'codegeist-2021'; // TODO: store as env variable

    const createUserProfiles = async (groupName) => {
        let members = await getGroupMembers(groupName);
        let userProfile = {};
        let profiles = [];

        members.results.map((member, index) => {
            const accountId = member.accountId;
            const name = member.publicName;
            const email = member.email;
            const profilePicture = member.profilePicture;
            const userSpace = member.personalSpace;
            const group = groupName;
            const title = '';
            const availability = ''; 
            let status = setStatusAtRandom(member);
            let timezone = Math.random() < 0.5 ? '☀️' : '🌚'; // temp placeholder
            let jobTitle = selectRandomFrom(jobTitlesList);                                  
            // let jobTitle = jobTitlesList[index];    // fixed        
            let startDate = '';                      
            let memo = selectRandomFrom(memos);                      

            profiles.push(
                {accountId: accountId,
                name: name, 
                email: email, 
                profilePicture: profilePicture, 
                personalSpace: userSpace, 
                group: group,
                status: status,
                timezone: timezone,
                jobTitle: jobTitle,
                memo: memo
                // page: `https://codegeist-2021.atlassian.net/wiki/people/${id}` 
                }       
            )        

            // profiles.push(userprofile);
            // const email = await getEmailAddress(id);
        })
        
        setUserProfiles(profiles);
        setGroupMembers(members);
        // <Image src="https://media.giphy.com/media/jUwpNzg9IcyrK/source.gif" alt="homer"/>
    }

    const renderData = async () => {
        const [ids, setIds] = useState();
          // useEffect(async () => {
            // if (groupMembers.results.length > 0) {
            if (groupMembers.length > 0) {
                setIds(await getAccountIds(groupMembers.results));
                setAccountIds(ids);
                renderHeader(groupMembers, groupName);
                // renderUsers(ids);
            } 
          // }, [groupMembers]);   
            // if (accountIds.length > 0) {
              return <Text content={`RenderData Account Id #s: ${JSON.stringify(accountIds)}`} />
            // }
    }

    const getData = async () => {
        const members = await getGroupMembers(groupName);

        setGroupMembers(members);
        setAccountIds(await getAccountIds(members.results));       
    }   

    const renderUsers = (ids) => (
        <Fragment>
            {ids.map(id => {
                return <User accountId={id}/>
            })}
        </Fragment>
        // return 'result: ' + JSON.stringify(ids);
    )    

    // TODO: lay out horizontally
    const renderUserProfiles = (groupName, userProfiles) => (
        <Fragment>
            {userProfiles.map(user => {
                // {displayIconsInTable(user)}
                return (
                    <Fragment>
                        <User accountId={user.accountId}/>
                       { <Badge appearance='primary' text={user.jobTitle} />}
                        {renderStatus(user)}
                        {/*<Heading size="medium">*/}
                        <Table>
                            <Head>
                                <Cell>
                                    <Text><Link href={`mailto:${user.email}`}>📧</Link></Text>
                                </Cell> 
                                <Cell>             
                                    <Text><Link href={`https://calendly.com/${CALENDLY_USER}`} openNewTab={true}>📅</Link></Text>
                                </Cell>  
                                <Cell>            
                                    <Text><Link href={`https://slack.com`} openNewTab={true}>💬 &nbsp; 📞</Link></Text>
                                </Cell>
                                <Cell>                   
                                    {/*<Text><Link href={`${user.link}`}>🔗</Link></Text>*/}
                                    <Text content={user.timezone} />
                                </Cell>
                                <Cell> 
                                    { /* TODO: delete or hide form submit button - not possible? */
                                        // renderToggleForCurrentUser(user)
                                    }  
                                </Cell>                                
                            </Head>
                        </Table>
                        {/*</Heading>*/}
                        
                      
                    </Fragment>
                )
            })}        
        </Fragment>
    )

    const isAvailable = (user) => {
            // return user.status.toLowerCase() == 'available';
            return user.status == 'Available';
    }    

    const isCurrentUser = (user) => {
        return user.accountId == accountId;
    }

    // revisit - fix this
    function renderToggleForCurrentUser(user) {
        return (isCurrentUser(user) && 
            <Fragment>
                <Form>
                    <Toggle label="Available" onChange={handleToggleChange(user)} name="toggleStatus" defaultChecked="true" />
                    <Text content='(me)'/>
                </Form>
                </Fragment>);
    }

    function handleToggleChange(user) {
          // useEffect(async () => {
                return user.status = !user.status;
          // }, [toggle]);          
    }
    const renderStatus = (user) => (
        <Fragment>
          <Tooltip text={setAwayMessage(user)}>
              <Text>
                <StatusLozenge
                  text={`${user.status}`}
                  appearance={isAvailable(user) ? 'success' : 'removed'}
                /> &nbsp; {isAvailable(user) ? '🟢' : '🔴'} &nbsp; 
                {isCurrentUser(user) ? <Text><Strong>(me)</Strong></Text> : ''}          
              </Text>
        </Tooltip>        
      </Fragment>
    )

    const setStatusAtRandom = (user) => {
        let defaultStatus = Math.random() < 0.6 ? 'Available' : 'Unavailable';
        
        // isCurrentUser(member) ? (status = 'Available') : (status = 'Unavailable');

        // current logged in user is available by default until manually toggled off
        if (isCurrentUser(user)) {
            defaultStatus = 'Available';
        }    
        return defaultStatus;    
    }

    // Hardcoded placeholders
    const jobTitlesList = ['CEO & Founder', 'Junior SEO Marketer', 'Senior SEO Marketer', 'Marketing Director', 'UX Researcher', 'Senior SEM Manager', 'SEO Manager', 'Chief Marketing Officer (CMO)', 'Affiliate Ads Specialist']; // temp placeholder

    let timeRemaining = 1320; // temp placeholder (in seconds)
    let measureofTime = 'minutes'; // temp placeholder

    // interval [startTime, endTime]
    const daytime = [4, 7]; // 4am - 7pm
    const nightTime = [7, 4]; // 7pm - 4am

    /* TODO: emojis -> HTML entities ? */
    const memos = ['Bathroom break 💩', 'Coffee break ☕️', 'Out sick 🤒', 'Out of office', `📵 In a meeting - I'll be back in ${format(timeRemaining)} ${measureofTime}!`, `📵 On a client call  - I'll be back in ${format(timeRemaining)} ${measureofTime}!`, 'PTO - vacay 😎 🏖 (see my calendar for availability)', 'business trip 💼 ✈️', 'Off work ✌️', 'In the zone - in deep concentration 👨🏻🧘🏻‍♀️'];  

    // placeholder method - needs revision ofc
    function format(timeinSeconds) {
        return (timeinSeconds / 60);
    }

    const setAwayMessage = (user) => {
        // placeholders
        let preferredModeOfContact = 'Slack DM or Zoom call (for complex matters)';
        // sync to company calendar + user's Calendly 

        // (!isAvailable(user)) ? user.memo : `Best way to reach me: ${preferredModeOfContact}`;

        if (!isAvailable(user)) {
            return user.memo;
        } else {
            return `Best way to reach me is via ${preferredModeOfContact}`;
        }
    }

    function selectRandomFrom(arr) {
        return arr[arr.length * Math.random() | 0]
    }

    // [{supervisor: '', underling: ''}]
    function getCompanyTree() {        
    }

    const displayIconsInTable = (user) => {
        return (
        <Table>
          <Head>
            <Cell>
    
{/*              <Text content="📧" />
              <Text>
                <Link href={'https://atlassian.net'}>{groupName}</Link>
              </Text>*/}

              <Text><Link href={`mailto:${user.email}`}>📧</Link></Text>            
            </Cell>            
            <Cell>
              {/*<Text content="📞" />*/}
              <Text><Link href={`${user.link}`}>🔗</Link></Text>
            </Cell>            
            <Cell>
              <Text content="📅" />
              <Text content="💬" />
            </Cell>
            <Cell>      
                <Text content={user.timezone} />
            </Cell>
          </Head>
            <Row>
              <Cell>
                
                <Text>
                    2 available now
                </Text>
              </Cell> 
            </Row>      
        </Table>          
    )}

    const renderHeader = (groupMembers, groupName) => {
        if (groupMembers.length > 0) {
          return (<SectionMessage title="Heading" appearance="info">
              <Heading size="medium">
                    <Text><Strong>{groupMembers.length}</Strong> members in {groupName}</Text>
              </Heading>         
          </SectionMessage>)
        }
    }

    const handleProfileClick = async (navItems, groupName) => {      
        setGroupMembers(await getGroupMembers(groupName));  
        setSelectedView(navItems[0]);        
        // await renderData();        
        await createUserProfiles(groupName);
        renderHeader(groupMembers, groupName);        
    }   
    const handleCompanyTreeClick = async (navItems) => {
        await createUserProfiles(groupName);
        setSelectedView(navItems[1]);
    }    
    const handleProgressClick = async (navItems) => {
        await createUserProfiles(groupName);
        setSelectedView(navItems[2]);
    }
    const handleMinutesClick = async (navItems) => {
        setSelectedView(navItems[3]);
    }
    const handleTrainingClick = async (navItems) => {
        setSelectedView(navItems[4]);
    }

    const buttonStyle = (index) => {
        return selectedView == navItems[index] ? 'warning' : 'default'
    }

    return (        
        <Fragment>                                    
         <ButtonSet>
             {/* <Button text={selectedView == navItems[0] ? `${JSON.stringify(groupMembers.length)} Members` : 'Members'} appearance={buttonStyle(0)} onClick={async () => { await handleProfileClick(navItems, groupName)}} />*/}
              <Button text={navItems[0]} appearance={buttonStyle(0)} onClick={async () => { await handleProfileClick(navItems, groupName)}} />

              {/* company structure, tree, hierarchy, "corporate ladder" */}
              <Button text={navItems[1]} appearance={buttonStyle(1)} onClick={async () => { await handleCompanyTreeClick(navItems)}} />
              
              {/*career trajectory - looking ahead*/}
              <Button text={navItems[2]} appearance={buttonStyle(2)} onClick={async () => { await handleProgressClick(navItems)}} />

              <Button text={navItems[3]} appearance='default' onClick={async () => { await handleMinutesClick(navItems)}} />
              <Button text={navItems[4]} appearance='default' onClick={async () => { await handleTrainingClick(navItems)}} />

            </ButtonSet>

          {/* <Button text="Get Groups" onClick={async () => { await setGroups({key: await getGroups()}); }} />
          <Button text="Get Data" onClick={async () => { await getData() }} />   */}

          {/*<Button text="Render Data" onClick={async () => { renderData() }} />   */}

          {/*<Text content={renderUsers(accountIds)} />*/}
  
          {/*{renderIcons()} */}

          {/*{renderData()}*/}
          {/*<Text content={`Context: ${JSON.stringify(context)}`} />*/}
          {/*{renderUsers(testIds)}*/}
       

        {groups && groupMembers && accountIds && userProfiles &&
             (<Fragment>
                {/*renderData()*/}
                {/*renderUsers(accountIds)*/}
                
                {renderUserProfiles(groupName, userProfiles)}                
                
                                                                
               {/* <Text content={`User Profile: ${JSON.stringify(async() => {await getUserProfile('61331ad944c8ed0068ae6050')})}`} /> */ }


            </Fragment>)
        }
             {/*<Text content={`Group members: ${JSON.stringify(groupMembers)}`} />*/}
    </Fragment>            
        
    )
};

export const run = render(
    <SpacePage>
        <App/>
    </SpacePage>
);

