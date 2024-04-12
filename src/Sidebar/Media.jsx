import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Button, Tooltip, Popover, Zoom } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { CiCirclePlus } from "react-icons/ci";
import { ReactSVG } from 'react-svg';
import instagram1 from '../Images/icons8-instagram.svg'
import facebook1 from '../Images/icons8-facebook.svg'
import twitter1 from '../Images/icons8-twitter.svg'
import telegram1 from '../Images/icons8-telegram.svg'
import pinterest1 from '../Images/icons8-pinterest.svg'
import youtube1 from '../Images/icons8-youtube.svg'
import linkedin1 from '../Images/icons8-linkedin.svg'
import google1 from '../Images/icons8-gmb.svg'
import reddit1 from '../Images/icons8-reddit.svg'
import fbpage from '../Images/icons8-fbg.svg'
import { useState } from 'react';


const Media = ({ onMediaPlatform }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showPopover, setShowPopover] = useState(false);
    const [submittedIcons, setSubmittedIcons] = useState([]);

    // const [socialMedia, setSocialMedia] = useState([]);
    const [mediaPlatform, setMediaPlatform] = useState([]);
    // useEffect(()=>{
    //     onMediaPlatform("nishu","nishu")
    //     // console.log(onMediaPlatform);
    // },[])

    let [facebook, fbg, twitter, youtube, instagram, linkedin, telegram, pinterest, reddit, gbm] = mediaPlatform;
    console.log(mediaPlatform);

    const handleSelectIconAndSendToParent = (icon) => {
        const index = mediaPlatform.indexOf(icon);
        let updatedIcons = [...mediaPlatform];
        if (index === -1) {
            updatedIcons.push(icon);
        } else {
            updatedIcons.splice(index, 1);
        }
        setMediaPlatform(updatedIcons);
        console.log(updatedIcons);
        onMediaPlatform(updatedIcons, extractIconNames(updatedIcons));
    };

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setShowPopover(true);
    }

    // Function to extract icon names from file paths
    const extractIconNames = (iconPaths) => {
        return iconPaths.map(path => {
            if (typeof path !== 'string') {
                console.error('Invalid path:', path);
                return ''; // or any other fallback value
            }
            const fileName = path.split('/').pop(); // Get the last part of the path
            const iconName = fileName.split('.')[0]; // Remove the file extension
            return iconName.replace('icons8-', ''); // Remove 'icons8-' prefix if it exists
        }).join(",");
    };

    // Extract icon names from mediaPlatform
    const iconNames = extractIconNames(mediaPlatform);
    console.log(iconNames);

    const handlePopoverClose = () => {
        if (showPopover) {
            setShowPopover(false);
            setMediaPlatform(submittedIcons);
        }
    };

    const handleSubmit = () => {
        setSubmittedIcons(mediaPlatform);
        setShowPopover(false);
        console.log(mediaPlatform);
    };

    const handelCancel = () => {
        if (showPopover) {
            setShowPopover(false);
            setMediaPlatform(submittedIcons);
        }
    };
    return (
        <div>
            <Tooltip TransitionComponent={Zoom} enterDelay={100} leaveDelay={100} >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {submittedIcons.length === 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', minWidth: '120px' }}>
                            <span style={{ fontSize: '14px', color: 'black' }}>Select Social Media</span>
                        </div>
                    )}
                    <IconButton>
                        <CiCirclePlus style={{ fontSize: '35px' }} onClick={handlePopoverOpen} />
                    </IconButton>
                    {submittedIcons.map((icon, index) => (
                        <div key={index} className="selected-icon" style={{ marginLeft: '10px' }}>
                            <img src={icon} alt={`Selected Icon ${index}`} style={{ width: '35px', maxWidth: '100%', maxHeight: '100%' }} />
                        </div>
                    ))}
                </div>
                <Popover
                    open={showPopover}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    PaperProps={{
                        style: {
                            borderRadius: '10px',
                            padding: '10px',
                            width: '330px',
                            overflow: 'auto',
                            height: '530px',

                        },
                    }}
                >
                    <Typography sx={{ p: 2, maxWidth: '350px' }}>
                        <Tooltip style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                <IconButton style={{ display: 'flex', flexDirection: 'column', paddingRight: '20px', marginBottom: '10px', backgroundColor: mediaPlatform.includes(facebook1) ? '#f0f1f3' : 'transparent', borderRadius: '0' }}>
                                    <ReactSVG src={facebook1} onClick={() => handleSelectIconAndSendToParent(facebook1)} name="mediaPlatform" values={facebook}></ReactSVG>
                                    <span style={{ fontSize: '13px', color: 'black' }}>faceBook</span>
                                </IconButton>
                                <IconButton style={{ display: 'flex', flexDirection: 'column', paddingRight: '20px', marginBottom: '10px', backgroundColor: mediaPlatform.includes(fbpage) ? '#f0f1f3' : 'transparent', borderRadius: '0' }}>
                                    <ReactSVG src={fbpage} onClick={() => handleSelectIconAndSendToParent(fbpage)} name='mediaPlatform' values={fbg}></ReactSVG>
                                    <span style={{ fontSize: '13px', color: 'black' }}>fbGroup</span>
                                </IconButton>
                                <IconButton style={{ display: 'flex', flexDirection: 'column', paddingRight: '20px', marginBottom: '10px', backgroundColor: mediaPlatform.includes(twitter1) ? '#f0f1f3' : 'transparent', borderRadius: '0' }}>
                                    <ReactSVG src={twitter1} onClick={() => handleSelectIconAndSendToParent(twitter1)} name='mediaPlatform' values={twitter}></ReactSVG>
                                    <span style={{ fontSize: '13px', color: 'black' }}>Twitter</span>
                                </IconButton>
                                <IconButton style={{ display: 'flex', flexDirection: 'column', paddingRight: '20px', marginBottom: '10px', backgroundColor: mediaPlatform.includes(instagram1) ? '#f0f1f3' : 'transparent', borderRadius: '0' }}>
                                    <ReactSVG src={instagram1} onClick={() => handleSelectIconAndSendToParent(instagram1)} name='mediaPlatform' values={instagram}></ReactSVG>
                                    <span style={{ fontSize: '13px', color: 'black' }}>Instagram</span>
                                </IconButton>
                                <IconButton style={{ display: 'flex', flexDirection: 'column', paddingRight: '20px', marginBottom: '10px', backgroundColor: mediaPlatform.includes(telegram1) ? '#f0f1f3' : 'transparent', borderRadius: '0' }}>
                                    <ReactSVG src={telegram1} onClick={() => handleSelectIconAndSendToParent(telegram1)} name='mediaPlatform' values={telegram}></ReactSVG>
                                    <span style={{ fontSize: '13px', color: 'black' }}>Telegram</span>
                                </IconButton>
                                <IconButton style={{ display: 'flex', flexDirection: 'column', paddingRight: '20px', marginBottom: '10px', backgroundColor: mediaPlatform.includes(reddit1) ? '#f0f1f3' : 'transparent', borderRadius: '0' }}>
                                    <ReactSVG src={reddit1} onClick={() => handleSelectIconAndSendToParent(reddit1)} name='mediaPlatform' values={reddit}></ReactSVG>
                                    <span style={{ fontSize: '13px', color: 'black' }}>Reddit</span>
                                </IconButton>
                                <IconButton style={{ display: 'flex', flexDirection: 'column', paddingRight: '20px', marginBottom: '10px', backgroundColor: mediaPlatform.includes(pinterest1) ? '#f0f1f3' : 'transparent', borderRadius: '0' }}>
                                    <ReactSVG src={pinterest1} onClick={() => handleSelectIconAndSendToParent(pinterest1)} name='mediaPlatform' values={pinterest}></ReactSVG>
                                    <span style={{ fontSize: '13px', color: 'black' }}>Pinterest</span>
                                </IconButton>
                                <IconButton style={{ display: 'flex', flexDirection: 'column', paddingRight: '20px', marginBottom: '10px', backgroundColor: mediaPlatform.includes(linkedin1) ? '#f0f1f3' : 'transparent', borderRadius: '0' }}>
                                    <ReactSVG src={linkedin1} onClick={() => handleSelectIconAndSendToParent(linkedin1)} name='mediaPlatform' values={linkedin}></ReactSVG>
                                    <span style={{ fontSize: '13px', color: 'black' }}>LinkedIn</span>
                                </IconButton>
                                <IconButton style={{ display: 'flex', flexDirection: 'column', paddingRight: '20px', marginBottom: '10px', backgroundColor: mediaPlatform.includes(youtube1) ? '#f0f1f3' : 'transparent', borderRadius: '0' }}>
                                    <ReactSVG src={youtube1} onClick={() => handleSelectIconAndSendToParent(youtube1)} name='mediaPlatform' values={youtube}></ReactSVG>
                                    <span style={{ fontSize: '13px', color: 'black' }}>Youtube</span>
                                </IconButton>
                                <IconButton style={{ display: 'flex', flexDirection: 'column', paddingRight: '20px', marginBottom: '10px', backgroundColor: mediaPlatform.includes(google1) ? '#f0f1f3' : 'transparent', borderRadius: '0' }}>
                                    <ReactSVG src={google1} onClick={() => handleSelectIconAndSendToParent(google1)} name='mediaPlatform' values={gbm}></ReactSVG>
                                    <span style={{ fontSize: '13px', color: 'black' }}>Bussiness Profile</span>
                                </IconButton>
                            </div>
                        </Tooltip>
                    </Typography>
                    <Button variant="outlined" color="error" style={{ marginTop: 'auto', padding: '5px 10px', transform: 'translate(10px,0px)' }} onClick={handelCancel} >
                        Cancel
                    </Button>
                    <Button variant="contained" style={{ marginTop: 'auto', padding: '5px 10px', transform: 'translate(140px,0px)' }} onClick={handleSubmit}  >
                        Submit
                    </Button>
                </Popover>
            </Tooltip>
        </div>
    )
}

export default Media