/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogActions, Grid, Button, Tooltip, Popover, Zoom, CircularProgress } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import EmojiPicker from "emoji-picker-react";
import Media from './Media'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axiosInstance from "../helper/AxiosInstance";
import QS from "../Images/QS.png"

const Post = () => {
    const [open, setOpen] = useState(true);
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [scheduleDateTime, setScheduleDateTime] = useState(null);
    const [caption, setCaption] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);
    const [shareButtonDisabled, setShareButtonDisabled] = useState(true);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [commentValue, setCommentValue] = useState('');
    const [changesMade, setChangesMade] = useState(false);
    const [selectedIcons, setSelectedIcons] = useState([]);
    const [mediaPlatform, setMediaPlatform] = useState('');
    const [loading, setLoading] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [recommendedHashtags, setRecommendedHashtags] = useState({});
    const [selectedHashtags, setSelectedHashtags] = useState([]);

    const handleSelectIconAndSendToParent = (selectedIcons, mediaPlatform) => {
        setSelectedIcons(selectedIcons);
        setMediaPlatform(mediaPlatform);
    };

    useEffect(() => {
        console.log("SM", mediaPlatform);
    }, [selectedIcons, mediaPlatform])

    const closeDialog = () => {
        setOpen(false);
        setFile(null);
        setFileType('');
        setSelectedOption('');
        setScheduleDateTime(null);
        setCaption('');
        setCommentValue('');
    };

    const handleConfirmCloseOpen = () => {
        if (changesMade) {
            setConfirmCloseOpen(true);
        } else {
            closeDialog();
        }
    };

    const handleConfirmCloseCancel = () => {
        setConfirmCloseOpen(false);
    };

    const handleChangesMade = () => {
        setChangesMade(true);
    };

    const handleSubmit = async () => {
        const endpoint = '/quantum-socialshare/post-file';
        const formData = new FormData();
        formData.append('mediaFile', file);

        const params = {
            caption: caption,
            mediaPlatform: mediaPlatform,
            keyword: keyword,
        };

        try {
            setLoading(true);
            setBlurBackground(true);
            const response = await axiosInstance.post(endpoint, formData, {
                headers: {
                    'Accept': 'application/json'
                },
                params: params
            });

            console.log('Response:', response.data);
            setLoading(false);
            setBlurBackground(false);
            const { postResponse, responseStructure } = response.data;

            if (postResponse) {
                postResponse.forEach(responseItem => {
                    const { successResponses, errorResponses } = responseItem;

                    if (successResponses && successResponses.length > 0) {
                        successResponses.forEach(success => {
                            const { message, platforms } = success;
                            const successMessage = `Success: In ${platforms} ${message}`;
                            console.log(successMessage);
                            toast.success(successMessage, {
                                onClose: () => window.location.reload()
                            })
                        });
                    }
                    if (errorResponses && errorResponses.length > 0) {
                        errorResponses.forEach(error => {
                            const { message, platforms } = error;
                            const errorMessage = `Error: ${platforms} ${message}`;
                            console.log(errorMessage);
                            toast.error(errorMessage, {
                                onClose: () => window.location.reload()
                            });
                        });
                    }
                });
            }

            if (responseStructure) {
                const { message } = responseStructure;
                const responseError = `Error:  ${message}`;
                console.log(responseError);
                toast.error(responseError, {
                    onClose: () => window.location.reload()
                });
            }

        } catch (error) {
            console.error('Error posting:', error);
            toast.error('Error posting: ', error, {
                onClose: () => window.location.reload()
            });
        }

    };

    const handleContinueEditing = () => {
        setConfirmCloseOpen(false);
    };

    const handleDiscard = () => {
        closeDialog();
        setConfirmCloseOpen(false);
    };

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileType(selectedFile?.type.startsWith('image') ? 'image' : 'video');
        setShareButtonDisabled(false)
        handleChangesMade();
        console.log('File selected:', e.target.files[0]);
    };

    const handle = (event) => {
        setSelectedOption(event.target.value);
        handleChangesMade();
    };

    const handleTextChange = (e) => {
        setCaption(e.target.value);
        handleChangesMade();
    };

    const addEmoji = (e) => {
        if (e.unified.startsWith('1F1E6')) {
            const codePoints = e.unified.split('-').map((code) => parseInt(code, 16));
            const flagEmoji = String.fromCodePoint(...codePoints);
            setCaption((prevText) => prevText + flagEmoji);
        } else {
            const sym = e.unified.split('_');
            const codeArray = sym.map((el) => parseInt(el, 16));
            const emoji = String.fromCodePoint(...codeArray);
            setCaption((prevText) => prevText + emoji);
        }
        handleChangesMade();
    };

    const handleEmojiIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const handleHashtagIconClick = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClosePopover1 = () => {
        setAnchorEl1(null);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setKeyword(value);

        const filtered = suggestions.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
        handleChangesMade();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/quantum-socialshare/recommend?keyword=${keyword}`);
                if (response.data.status === "success") {
                    setRecommendedHashtags(response.data.recommendedHashtag);
                } else {
                    console.error('Error fetching data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (keyword.trim() !== '') {
            fetchData();
        } else {
            setRecommendedHashtags({});
        }
    }, [keyword]);

    const handleSelectHashtag = (hashtag) => {
        setSelectedHashtags([...selectedHashtags, `#${hashtag}`]); // Append the selected hashtag with '#' tag to the list
    };

    const handleAddHashtags = () => {
        if (selectedHashtags.length > 0) {
            setKeyword(''); // Clear the text box
            setRecommendedHashtags({}); // Clear the dropdown
            // Do something with the selected hashtags, for now, we will just log them
            console.log(selectedHashtags);
            const updatedCaption = selectedHashtags.map((tag) => tag).join(' ');
            setCaption((prevCaption) => prevCaption + ' ' + updatedCaption);
            // Clear selected hashtags
            setSelectedHashtags([]);
        }
    };

    const handleMsgClick = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleCloseMsgPopover = () => {
        setAnchorEl2(null)
        setCommentValue('')
    };

    const handleInputMsgChange = (event) => {
        const value = event.target.value;
        setCommentValue(value);
        handleChangesMade();
    };

    const SendMsgClick = () => {
        console.log(commentValue)
        setAnchorEl2(false)
    }
    const clearMsgClick = () => {
        setCommentValue('')
        setAnchorEl2(null)
    }

    return (
        <>
            <Dialog className="postContent" open={open} onClose={closeDialog} fullWidth maxWidth="lg">
                {loading && ( // Display loading indicator conditionally
                    <div className="loading-overlay">
                        {/* <h1>Loading....</h1> */}
                        <CircularProgress />
                    </div>
                )}
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item lg={7} md={7} xs={12} sx={{ border: 1, borderStyle: 'ridge' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {/* <h4 id="newPost">New Post</h4> */}
                                <img src={QS} alt="" height={30} />
                                <Media onMediaPlatform={handleSelectIconAndSendToParent} />                            </div>
                            <div className="choose">
                                <textarea className="area" rows={12} placeholder="Type your text here..." value={caption} name="caption" onChange={handleTextChange}
                                    style={{ width: '98%', border: '1px solid #ccc', borderRadius: '5px', resize: 'none', outline: 'none' }} id="textHere" />
                                <div>
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ flexWrap: 'wrap' }}>
                                        <Tooltip TransitionComponent={Zoom} title="Attach Photo or Video" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton component="label" htmlFor="fileInput">
                                                <AddPhotoAlternateOutlinedIcon />
                                                <input
                                                    id="fileInput"
                                                    type="file"
                                                    accept="image/*, video/*"
                                                    style={{ display: "none" }}
                                                    onChange={handleChange}
                                                    name="mediaFile" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title="Add emojis" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton>
                                                <MoodOutlinedIcon onClick={handleEmojiIconClick} />
                                                <Popover
                                                    open={Boolean(anchorEl)}
                                                    anchorEl={anchorEl}
                                                    onClose={handleClosePopover}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}

                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}
                                                >
                                                    <EmojiPicker onEmojiClick={addEmoji} />
                                                </Popover>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title="Add Location" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton>
                                                <FmdGoodOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title="Hashtag" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton>
                                                <TagOutlinedIcon onClick={handleHashtagIconClick} />
                                                <Popover
                                                    open={Boolean(anchorEl1)}
                                                    anchorEl={anchorEl1}
                                                    onClose={handleClosePopover1}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}
                                                    PaperProps={{
                                                        style: {
                                                            width: '300px',
                                                            height: '185px',
                                                            background: '#f5f5f5'
                                                        },
                                                    }}
                                                >
                                                    <div>
                                                        {selectedHashtags.map((hashtag, index) => (
                                                            <span key={index}>{hashtag} </span>
                                                        ))}
                                                    </div>
                                                    <div style={{ padding: '10px', width: '100px', display: 'flex', flexDirection: 'column' }}>
                                                        <textarea
                                                            type="text"
                                                            value={keyword}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter text only"
                                                            style={{ width: '280px', resize: 'none', border: '0.5px solid grey', outline: 'none', borderRadius: '10px', paddingTop: '5px' }}
                                                        />
                                                        {Object.keys(recommendedHashtags).length > 0 && (
                                                            <ul>
                                                                {Object.entries(recommendedHashtags).map(([hashtag, count]) => (
                                                                    <li key={hashtag} onClick={() => handleSelectHashtag(hashtag)}>
                                                                        {hashtag}: {count}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}

                                                        <Button onClick={handleAddHashtags} variant="contained" style={{ marginTop: 'auto', padding: '5px 10px', transform: 'translate(200px,80px)' }} >
                                                            Add
                                                        </Button>
                                                    </div>
                                                </Popover>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title="Tag People" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton>
                                                <SellOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip TransitionComponent={Zoom} title="My Primary Comment" enterDelay={100} leaveDelay={100} placement="top-end">
                                            <IconButton>
                                                <ChatBubbleOutlineOutlinedIcon onClick={handleMsgClick} />
                                                <Popover
                                                    open={Boolean(anchorEl2)}
                                                    anchorEl={anchorEl2}
                                                    onClose={handleCloseMsgPopover}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'center',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'center',
                                                    }}
                                                    PaperProps={{
                                                        style: {
                                                            width: '300px',
                                                            height: '185px',
                                                            background: '#f5f5f5',
                                                            padding: '10px'
                                                        }
                                                    }}
                                                >
                                                    <div>
                                                        <textarea className="area"
                                                            value={commentValue}
                                                            onChange={handleInputMsgChange}
                                                            placeholder="Add Comment Here"
                                                            style={{ width: '100%', height: '120px', border: 'none', resize: 'none', outline: 'none', borderRadius: '10px', padding: '10px' }}
                                                            id="textHere" />
                                                    </div>
                                                    <Button onClick={SendMsgClick} variant="contained" style={{ marginTop: 'auto', padding: '5px 10px', transform: 'translate(160px,0px)' }} >
                                                        Add
                                                    </Button>
                                                    <Button onClick={clearMsgClick} color="error" style={{ marginTop: 'auto', padding: '5px 10px', transform: 'translate(160px,0px)' }} >
                                                        Clear
                                                    </Button>
                                                </Popover>
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                    <FormControl className="option" sx={{ mt: 3, width: 300, maxWidth: '100%' }}>
                                        <InputLabel id="demo-select-small-label">Select an Option</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={selectedOption}
                                            onChange={handle}
                                            label="Select an Option"
                                            sx={{ fontSize: '16px', mb: 1 }}
                                        >
                                            <MenuItem value={10}>Post Now</MenuItem>
                                            <MenuItem value={20}>Schedule Specific Date and Time</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                {selectedOption === 20 && (
                                    <div className="datetime-picker" style={{ width: 300, maxWidth: '100%', marginBottom: '10px' }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                value={scheduleDateTime}
                                                onChange={(newValue) => setScheduleDateTime(newValue)}
                                                sx={{ mt: 1 }}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                )}
                            </div>
                        </Grid>
                        <Grid item lg={5} md={5} xs={12} sx={{ border: 1, borderStyle: 'ridge', display: 'flex', flexDirection: 'column', background: '#f5f5f5' }}>
                            <div className="preview" style={{ padding: '8px' }}>
                                <h4 id="newPost">Media Preview</h4>
                            </div>
                            <div style={{ background: '#fff', width: '95%', maxWidth: '100%', height: '100%', borderRadius: '10px' }}>
                                <div className="main-preview" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', background: '#fff' }}>
                                    <div className="file-preview-container" style={{ height: '200px', width: '350px', padding: '1px', maxWidth: '100%', textAlign: 'center' }}>
                                        {fileType === 'image' && file && (
                                            <img src={URL.createObjectURL(file)} alt="File Preview" className="file-preview" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                        )}
                                        {fileType === 'video' && file && (
                                            <video controls className="file-preview" style={{ maxHeight: '100%', maxWidth: '100%' }}>
                                                <source src={URL.createObjectURL(file)} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                        {fileType !== 'image' && fileType !== 'video' && (
                                            <p id="imgPreview" style={{ marginTop: '100px', color: '#808080', }}>Image Preview</p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-preview" style={{ wordBreak: 'break-all', padding: '10px' }}>{caption.split('\n').map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))}</div>
                            </div>
                            <div className="main-comment" style={{ marginTop: 'auto', padding: '10px' }}>
                                <h4 id="commentPreview">Comment Preview</h4>
                                <div className="comment-preview" style={{ border: '0.5px solid grey', borderRadius: '10px', height: '100px', width: '95%', padding: '10px', overflow: 'auto', wordBreak: 'break-word', maxWidth: '100%', background: '#fff' }} >{commentValue.split('\n').map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className="action" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h6 style={{ color: 'grey' }}>Powered by Quantum Paradigm</h6>
                    <div>
                        <Button onClick={handleConfirmCloseOpen} color="error">
                            Cancel
                        </Button>
                        <Button variant="contained" disabled={shareButtonDisabled} endIcon={<SendIcon />} onClick={handleSubmit} sx={{ borderRadius: '20px' }}>
                            Share
                        </Button>
                    </div>
                </DialogActions>

            </Dialog >

            <Dialog open={confirmCloseOpen} onClose={handleConfirmCloseCancel}>
                <DialogContent>
                    <p>Are you sure you want to close without saving?</p>
                </DialogContent>


                <DialogActions>
                    {/* <Button onClick={handleSaveDraft} sx={{ color: 'gray', paddingRight: '50px' }}>
                        Save as Draft
                    </Button> */}
                    <Button onClick={handleContinueEditing} sx={{ color: 'gray', paddingRight: '30px' }}>
                        Continue Editing
                    </Button>
                    <Button variant="contained" onClick={handleDiscard} color="error">
                        Discard
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </>
    );
};

export default Post;