import React from 'react'
import Login from './Navbar/Login'
import SignUp from './Navbar/SignUp'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidenav from './Navbar/Sidenav'
import Dashboard from './Sidebar/Dashboard'
import AccountOverview from './Sidebar/AccountOverview'
import Post from './Sidebar/Post'
import { Analytics } from '@mui/icons-material'
import TeamChatBox from './Sidebar/TeamChatBox'
import SocialIntegration from './Sidebar/SocialIntegration'
import Home from './Navbar/Home'
import Hashtag from "./Sidebar/Hashtag";
import './global.css'


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
               
                <Route path='/' element={<Home/>}/>
                <Route path="/login"  element={<Login />}/>
                <Route path="/signUp"  element={<SignUp />}/>
                {/* <Route path='/dashboard' element={<Sidenav/>}> */}
                <Route path="/dashboard" element={<Dashboard />} >
            <Route path="/dashboard/account-overview" element={<AccountOverview />} />
            <Route path="/dashboard/publish" element={<Post />} />
            {/* <Route path="/dashboard/template" element={<Template />} /> */}
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/team-chat-box" element={<TeamChatBox />} />
            <Route path="/dashboard/social-integration" element={<SocialIntegration />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App