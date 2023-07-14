import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, Pressable, TextInput, Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, StatusBar  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useState, useEffect, useRef } from 'react';
import { COLORS, FONTS } from "../../../constants";
import HomeHeader from "../../../components/HomeHeader";
import Hobbies from "./Hobbies";
import Photos from "./Photos";
import Collection from "./Collection";
import NftCollection from "../aiNftGenerator/NftCollection";
import Edit from './Edit';
import Preview from './preview/Preview';
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import Loading from "../../../components/Loading";
import Status from './Status';
import Generating from './Generating';
import { Complete } from '../../../components';
import Draft from '../Draft';
import AndroidSafeAreaView from "../../../components/AndroidSafeAreaView";
import { ScrollView } from 'react-native-gesture-handler';
import CollectionType from '../aiNftGenerator/CollectionType';
import NftButtons from '../aiNftGenerator/NftButtons';
import NftPhoto from '../aiNftGenerator/NftPhoto';
import NftResults from '../aiNftGenerator/NftResults';
import NftCollectionSettings from '../aiNftGenerator/NftCollectionSettings';
import NftSaving from '../aiNftGenerator/NftSaving'
import AiAlgorithm from '../aiNftGenerator/AiAlgorithm';
import PopUpInfo from '../../../components/PopUpInfo';

var width = Dimensions.get('window').width - 40;
var width2 = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var buttonHeight = Platform.OS === 'ios' ? height : height + 70;

const Upload = ({ navigation, route }) => {

  const [achievements, setAchievements] = useState('');
  const [otherHobbies, setOtherHobbies] = useState('');
  const [image, setImage] = useState(null);

  // Choose upload option
  const [option, setOption] = useState(1);

  // Set step in selected option
  const [step, setStep] = useState(0);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genereatedId, setGeneratedId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [token, setToken] = useState('');
  const [missing, setMissing] = useState('');
  const [owner, setOwner] = useState('');
  const [animatedImage, setAnimatedImage] = React.useState('');
  const [animatedVideo, setAnimatedVideo] = React.useState('');
  const [uploadedImage, setUploadedImage] = React.useState('');
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [username, setUsername] = useState();
  const [gender, setGender] = useState();
  const [collection, setCollection] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [allow, setAllow] = useState(false);
  const [postId, setPostId] = useState();
  const [formImage, setFormImage] = useState(null);
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const [animationInProcess, setAnimationInProcess] = useState(false);
  const hobbies = selected.join(', ');
  const [posts, setPosts] = useState([]);
  const [mainError, setMainError] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState(''); 
  const [saved, setSaved] = useState(false);
  const [stopVideo, setStopVideo] = useState(true);
  const [muteVideo, setMuteVideo] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const video = useRef(null);

  // Nft generator states
  const [collectionType, setCollectionType] = useState();
  const [promt, setPromt] = useState('');
  const [promtNegative, setPromtNegative] = useState('');
  const [generatedNfts, setGeneratedNfts] = useState([]);
  const [imagesAmount, setImagesAmount] = useState('4');

  useEffect(() => {
    if(route.params === 'PERSONAL_AI_AVATAR') {
      setStep(1);
      setOption(1);
    } else {
      setStep(1);
      setOption(2);
    }
  }, [route.params]);

  const handleSelectItem = (itemId, item) => {
    if (selected.filter(selected => selected.includes(item)).length > 0) {
        const newArray = selected.filter(selected => selected !== item);
        setSelected(newArray);
    } else  {
      setSelected(current => [...current, item]);
    }
  }

  const handleSelectCollection = () => {
    setCollection(!collection);
    setAllow(!allow);
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const StopVideo = () => {
    console.log('Stoped');
    setStopVideo(false);
    setMuteVideo(true);
  }

  const setAction = () => {
    console.log('Post ID: ', postId);
    if(step === 1) {
      if(collection) {
        setError('');
        setStep(step + 1);
        setEnabled(false);
      } else {
        setError('Please select collection to continue')
      }
    }
    else if(step === 2) {
      setMissing('');
      result ? null : generateText();
      setStep(step + 1);
    }
    else if(step === 3) {
      addTextToPost();
      setStep(step + 1);
    }
    else if(step === 4) {
      if(!image) {
        setMissing('Please select image to upload first');
      } else {
        console.log('This steps from image upload to generate video');
        setMissing('');
        setStep(step + 1);
      }
    } else if(step === 5) {
      generateAnimation();
      setStep(step + 1);
    } else if(step === 7) {
      setStep(step + 1);
      console.log('This not sure');
    }
  }

  async function getToken() {
    const token = await SecureStore.getItemAsync('secure_token');
    const owner = await SecureStore.getItemAsync('username');
    setToken(token);
    setOwner(owner);
  }

  // 1. Creates text from hobbies and achevement.

  const generateText = () => {
    setLoading(true);
    setLoadingTitle('Generating your story');

      const apiKey = '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';
      const client = axios.create({
          headers: {
            Authorization: "Bearer " + apiKey,
          },
        });
      const params = {
        prompt: `Make only a 5 sentence story with all my personal details in first person and with funny twist. My name is ${name ? name : username} ${surname ? surname : ''}, i was born in "${date}", my gender is ${gender}, I'm from "Lithuania", My username is "${username}", my hoby is ${hobbies === 'other..' ? '' : `"${hobbies}"`} and my biggest achievement is that "${achievements}".`,
        model: "text-davinci-003",
        max_tokens: 600,
        temperature: 0.5,
        };
        console.log(`Make only a 5 sentence story with all my personal details in first person and with funny twist. My name is ${name ? name : username} ${surname ? surname : ''}, i was born in "${date}", my gender is ${gender}, I'm from "Lithuania", My username is "${username}", my hoby is ${hobbies === 'other..' ? '' : `"${hobbies}"`} and my biggest achievement is that "${achievements}".`)  
          client
            .post("https://api.openai.com/v1/completions", params)
            .then((result) => {
              setLoading(false);
              setResult(result.data.choices[0].text.trim());
              console.log(result.data.choices[0].text.trim());
            })
            .catch((err) => {
              setLoading(false)
              console.log(err);
          });
    };

  // 2. Saves post text to backend.

  async function addTextToPost () { 
    var token = await SecureStore.getItemAsync('secure_token');
    var edit = {
      description: result,
      date_updated: ""
      };
    console.log('Post URL to save: ', `https://api.dememoriam.ai/posts/${postId}/`) 

    fetch(`https://api.dememoriam.ai/posts/${postId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(edit)
      })
      .then(response => response.json())
      .then(data => {
        console.log(`Saved description: ${postId}`, data);
      })
      .catch((error) => {
        console.error('Error with post saving:', error.response.data);
      });
  };

  // 3. Saves image to backend.

  const saveImage = async () => {
    var token = await SecureStore.getItemAsync('secure_token');
      fetch(
        `https://api.dememoriam.ai/posts/${postId}/`,
        {
          method: 'PUT',
          headers: {
            'authorization': `Bearer ${token}`,
          },
          body: formImage,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log('Image uploaded successfully: ', result.image);
        })
        .catch((error) => {
          console.error('Error with image:', error.response);
        });
  };

  // 3. Use text and image to generate video.

  const generateAnimation = () => {
    console.log('3. Video generation step started:');
    StopVideo();
    setSaved(false);
    if(uploadedImage && result) {
      console.log('Successfully provided: ', uploadedImage, 'Text provided: ', result, 'Voice: ', gender === 'Female' ? 'Jenny' : "Eric");
      setAnimationInProcess(true);
      const optionsGenerate = {
        method: 'POST',
        url: 'https://api.d-id.com/talks',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Basic YVc1bWIwQjBhR1ZtYVhOb2RtVnljMlV1WTI5dDpkeDNqNExWWldHYzhSel9qeGJLOVI='
        },
        data: {
          script: {
            type: 'text',
            provider: {type: 'microsoft', voice_id: gender === 'Female' ? 'Jenny' : "Eric" },
            ssml: 'false',
            input: result
          },
          config: {fluent: 'false', pad_audio: '0.0'},
          source_url: uploadedImage
        }
      };
      axios
      .request(optionsGenerate)
      .then(function (response) {
        console.log("Video generated successfuly:", response.data);
        console.log("Getting new generated video ID:", response.data.id);
        displayVideo(response.data.id);
      })
      .catch(function (error) {
        setAnimationInProcess(false);
        setSaved(true);
        console.log("Video generation failed:", error);
        console.error(error);
      });
  } else {
    console.log('Failed to provide provided: ', uploadedImage, 'Text provided: ', result);
  }
  };

  // 4. Gets video url to display it.

  const displayVideo = (id) => {
    console.log(`New url looks like this https://api.d-id.com/talks/${id}`)
    const options = {
      method: 'GET',
      url: `https://api.d-id.com/talks/${id}`,
      headers: {
        accept: 'application/json',
        //authorization: 'Basic YW5kcml1c2tldmljaXVzLmVybmVzdGFzQGdtYWlsLmNvbQ:6PuJ5Jdzyk_-CzC8gVUNF'
        authorization: 'Basic YVc1bWIwQjBhR1ZtYVhOb2RtVnljMlV1WTI5dDpkeDNqNExWWldHYzhSel9qeGJLOVI='
      }
    };
    
    axios
      .request(options)
      .then(function (response) {
        var retryCounter = 9;
        console.log("This main data:", response.data);
        console.log("Tries left to retry: ", retryCounter);
        setAnimatedImage(response.data.source_url);
        if(response.data.status === 'done') {
          uploadVideoToServer(response.data.result_url);
          setAnimatedVideo(response.data.result_url);
          console.log('Status done video: ', response.data.result_url)
        } else {
          console.log('Trying again..');
          retryCounter--
          setTimeout(() => {
            displayVideo(id);
          }, 1000);
        }
        console.log("Video:", animatedVideo, "Image:", animatedImage);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

 // 5. Uploads video to backend.

  const uploadVideoToServer = async (url) => {
    var token = await SecureStore.getItemAsync('secure_token');
      console.log('Video upload Started...', url);
      const form = new FormData();
      form.append('video', {
        uri: url,
        type: 'video/mp4',
        name: `${postId}-animated-nft.mp4`,
      });
      console.log("Video url form: ", form);
      fetch(
        `https://api.dememoriam.ai/posts/${postId}/video/`,
        {
          method: 'PUT',
          headers: {
            'authorization': `Bearer ${token}`,
          },
          body: form,
        }
      )
        .then(response => response.json())
        .then((result) => {
          setStep(7);
          setAnimationInProcess(false);
          console.log('Video successfuly uploaded:', result);
        })
        .catch((error) => {
          console.error('Error with video:', error);
        });
  };

  // Refresh continue button status on options selected.

  useEffect(() => {
    if(step === 1) {
      if(collection) {
        setEnabled(true);
        setError('');
      } else {
        setEnabled(false);
      }
    } else if(step === 2) {
      if(selected.length !== 0 && achievements) {
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    } else if(step === 3) {
      if(setUploadedImage != '') {
        setEnabled(true);
        setMissing('');
      } else {
        setEnabled(false);
      }
    }
  }, [collection, selected, achievements, setUploadedImage]);

  // Get your current posts.

  const getPosts = async () => {
    var token = await SecureStore.getItemAsync('secure_token');
      fetch(
        `https://api.dememoriam.ai/posts/`,
        {
          method: 'GET',
          headers: {
            'authorization': `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
            setPosts(result.results);
            console.log(result.results.length, 'posts Loaded.')
            if(result.results.length === 5) {
              setInfoVisible(true);
            } else {
              setInfoVisible(false);
            }
        })
        .catch((error) => {
          console.error('Error with image:', error.response);
        });
  };
    
  const generateNfts = (generateTime) => {
    if(image !== null) {
      generateNftImageToImage();
    } else {
      generateNftTextToImage(generateTime);
    }
  }
  
  // Generate NFT in stable diffusion text to image

  async function generateNftTextToImage (generateTime) {
    console.log('Starting generate TextToImage, selected model', collectionType);
    if(generateTime === 1) {
      setLoading(true);
    } 
    var edit = {
        "key": "MLxMaQ9Xpq7e6krcLfotAsVzLb5IIS1F6y0EnbVTq824rPLP8ljjb6Ip7HDs",
        "prompt": `((${promt})), hyper detail, unedited, symmetrical balance, in-frame, 8K masterpiece`,
        "negative_prompt": `((${promtNegative})), painting, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, deformed, ugly, blurry, bad anatomy, bad proportions, extra limbs, cloned face, skinny, glitchy, double torso, extra arms, extra hands, mangled fingers, missing lips, ugly face, distorted face, extra legs`,
        "model_id": collectionType,
        "multi_lingual": null,
        "panorama": null,
        "self_attention": null,
        "width": "512",
        "guidance": "7.5",
        "height": "512",
        "samples": 4,
        "safety_checker": null,
        "steps": 20,
        "seed": null,
        "webhook": null,
        "track_id": null,
        "scheduler": "UniPCMultistepScheduler"
    }
    fetch(`https://stablediffusionapi.com/api/v4/dreambooth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(edit)
      })
      .then(response => response.json())
      .then(data => {
        if(data.status === 'processing') {
          console.log('Retrying after 5secs:');
          setTimeout(() => {
            checkIfDone(data.id)
          }, 5000);
        } else {
          setLoading(false);
          console.log(`Old saved nfts: `, generatedNfts);
          setGeneratedNfts(data.output);
          console.log(`New Saved nfts: `, generatedNfts);
        }
      })
      .catch((error) => {
        console.error('Error with post saving:', error.response.data);
      });


  };

    // Generate NFT in stable diffusion text to image

    async function generateNftImageToImage () {
      setLoadingTitle('Generating your collection')
      setLoading(true);
      var edit = {
          "key": "MLxMaQ9Xpq7e6krcLfotAsVzLb5IIS1F6y0EnbVTq824rPLP8ljjb6Ip7HDs",
          "prompt": `((${promt})), hyper detail, unedited, symmetrical balance, in-frame, 8K masterpiece`,
          "negative_prompt": `((${promtNegative})), painting, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, deformed, ugly, blurry, bad anatomy, bad proportions, extra limbs, cloned face, skinny, glitchy, double torso, extra arms, extra hands, mangled fingers, missing lips, ugly face, distorted face, extra legs`,
          "model_id": collectionType,
          "init_image": uploadedImage,
          "width": "512",
          "height": "512",
          "samples": "1",
          "num_inference_steps": "30",
          "safety_checker": "no",
          "enhance_prompt": "yes",
          "guidance_scale": 7.5,
          "strength": 0.7,
          "scheduler": "UniPCMultistepScheduler",
          "seed": null,
          "lora_model": null,
          "tomesd": "yes",
          "use_karras_sigmas": "yes",
          "vae": null,
          "lora_strength": null,
          "embeddings_model": null,
          "webhook": null,
          "track_id": null
        }
      console.log('Starting generate ImageToImage...', edit) 
      
      fetch(`https://stablediffusionapi.com/api/v4/dreambooth/img2img`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(edit)
        })
        .then(response => response.json())
        .then(data => {
          if(data.status === 'processing') {
            console.log('Retrying after 5secs...')
            setTimeout(() => {
              checkIfDone(data.id)
            }, 5000);
          } else {
            setLoading(false);
            setGeneratedNfts(data.output)
            console.log(`Saved nft: `, data);
          }
        })
        .catch((error) => {
          console.error('Error with post saving:', error.response.data);
        });
    };

  // If nft not loaded yet repeat in 5 secs

  const checkIfDone = async (request_id) => {
    console.log('retrying...', request_id)
    setLoading(true);
    var edit = {
      "key": "MLxMaQ9Xpq7e6krcLfotAsVzLb5IIS1F6y0EnbVTq824rPLP8ljjb6Ip7HDs",
      "request_id": request_id
    }

    fetch(`https://stablediffusionapi.com/api/v4/dreambooth/fetch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(edit)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Responce after 5 secs: ', data.status)
        if(data.status !== 'success') {
          console.log('Retrying after 5secs.')
          setTimeout(() => {
            checkIfDone(request_id)
          }, 10000);
        } else {
          setLoading(false);
          setGeneratedNfts(data.output)
          console.log(`Saved nft: `, data);
        }
      })
      .catch((error) => {
        console.error('Error with post saving:', error.response.data);
      });
  }
  
  // Save NFTs collection to post

  const saveNftImage = async () => {
    var token = await SecureStore.getItemAsync('secure_token');
    console.log('SaveURLs: ', generatedNfts)
    var edit = {
      description: JSON.stringify(generatedNfts),
      date_updated: ""
      };
    console.log('Post URL to save: ', `https://api.dememoriam.ai/posts/${postId}/`) 

    fetch(`https://api.dememoriam.ai/posts/${postId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(edit)
      })
      .then(response => response.json())
      .then(data => {
        console.log(`Saved description: ${postId}`, data);
        if(posts.length === 5) {
          setInfoVisible(true);
        } else {
          setInfoVisible(false);
        }
      })
      .catch((error) => {
        console.error('Error with post saving:', error.response.data);
      });
  
  };
    
  // Save settings to post

  const saveSettings = async () => {
    var token = await SecureStore.getItemAsync('secure_token');
    var edit = {
      collection: collectionName,
      status: "PUBLISHED",
      date_updated: ""
      };
    console.log('Post URL to save: ', `https://api.dememoriam.ai/posts/${postId}/`) 

    fetch(`https://api.dememoriam.ai/posts/${postId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(edit)
      })
      .then(response => response.json())
      .then(data => {
        console.log(`Saved name: ${postId}`, data);
        setStep(step + 1);
      })
      .catch((error) => {
        console.error('Error with post saving:', error.response.data);
      });
  };

  const saveNFTsCollection = async () => {
    saveNftImage();
    console.log('Saving nfts...');
  }

  useEffect(() => {
    getToken();
  }, []);

  const finishUpload = (minting) => {
      changeStatus();
      async function changeStatus () { 
        var token = await SecureStore.getItemAsync('secure_token');
        var edit = {
          status: "PUBLISHED",
          date_updated: ""
          };
        console.log('Post URL to save: ', `https://api.dememoriam.ai/posts/${postId}/`) 
    
        fetch(`https://api.dememoriam.ai/posts/${postId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          },
          body: JSON.stringify(edit)
          })
          .then(response => response.json())
          .then(data => {
            console.log(`Status changed: ${postId}`, data.status);
            navigation.navigate("User");
            setStep(0);
          })
          .catch((error) => {
            console.error('Error with post saving:', error);
          });
      };
  }

  useEffect(() => {
    getPosts();
  }, []);
  
  return (
    <KeyboardAvoidingView
      enableOnAndroid={true}
      enableAutomaticScroll={(Platform.OS === 'ios')}
      extraScrollHeight={Platform.OS === 'ios' ? 0 : 50}
      extraHeight={Platform.OS === 'ios' ? 0 : 50}
      style={styles.containerER}
    >
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={[AndroidSafeAreaView.AndroidSafeArea, styles.container]}>
        <StatusBar
          backgroundColor={step === 7 ? "#15221D" : "rgba(11, 11, 11, 1)"}
        />
            { step !== 7 ? <HomeHeader 
            title={
              step === 1 ? "Collection selection" :
              step === 2 ? "What are your thoughts" :
              step === 3 ?  "Edit transcript & voice" :
              step === 4 ? "Upload your looks" :
              step === 5 ? "Preview" : null } 
              step={step} setStep={setStep} option={option} setOption={setOption} navigation={navigation}  /> 
              : null 
            }
            {step === 0 || step === 7 || step === 8 || option === 2 ? null : 
            <View style={styles.processBar}>
              <View style={styles.processBarGray}></View>
              <View style={[styles.processBarGreen, {width: ((width / 8) * step)}]}></View>
            </View>}
              { option === 1 ?
                  step === 0 ? 
                    <Draft 
                      navigation={navigation} 
                      posts={posts} 
                      setStep={setStep} 
                      setOption={setOption}
                      option={option}
                      step={step} 
                      setPostId={setPostId} 
                      getPosts={getPosts} 
                      setResult={setResult}
                      setImage={setImage}
                    /> :
                  step === 1 ? 
                    <Collection 
                      collection={collection}
                      setCollection={setCollection}
                      handleSelectCollection={handleSelectCollection}
                      error={error}
                    /> :  
                  step === 2 ? 
                  <Hobbies 
                      handleSelectItem={handleSelectItem}
                      achievements={achievements}
                      otherHobbies={otherHobbies}
                      setAchievements={setAchievements}
                      setOtherHobbies={setOtherHobbies}
                      selected={selected}
                      missing={missing}
                      setName={setName}
                      setGender={setGender}
                      setUsername={setUsername}
                      isKeyboardVisible={isKeyboardVisible}
                      setKeyboardVisible={setKeyboardVisible}
                      setPostId={setPostId}
                      setDate={setDate}
                      setSurname={setSurname}
                  /> : 
                  step === 3 ?
                  <Edit 
                      result={result} 
                      setResult={setResult} 
                      selected={selected} 
                      image={image} 
                      achievements={achievements} 
                      otherHobbies={otherHobbies} 
                      loading={loading}
                      setLoading={setLoading}
                      name={name}
                      username={username}
                      gender={gender}
                      setPostId={setPostId}
                      postId={postId}
                      date={date}
                      surname={surname}
                  />
                  :
                  step === 4 ?
                  <Photos
                      image={image}
                      setImage={setImage} 
                      missing={missing}
                      setUploadedImage={setUploadedImage}
                      setFormImage={setFormImage}
                      postId={postId}
                      setLoading={setLoading}
                      setLoadingTitle={setLoadingTitle}
                  />
                  :
                  step === 5 ?
                  <Status postId={postId} />
                  :
                  step === 6 ?
                  <Generating saved={saved} setSaved={setSaved} generateAnimation={generateAnimation} />
                  :
                  step === 7 ?
                  <Complete title="Preview is ready" description="Preview of your generated story is ready. Edit it or share it on NFTgenius feed." setStep={setStep} navigation={navigation} />
                  :
                  step === 8 ?
                  <Preview 
                      selected={selected} 
                      image={image} 
                      result={result} 
                      modalVisible={modalVisible}
                      setModalVisible={setModalVisible}
                      navigation={navigation}
                      genereatedId={genereatedId}
                      animatedImage={animatedImage}
                      animatedVideo={animatedVideo}
                      setAnimatedImage={setAnimatedImage}
                      setAnimatedVideo={setAnimatedVideo}
                      uploadedImage={uploadedImage}
                      loading={loading}
                      stopVideo={stopVideo}
                      muteVideo={muteVideo}
                  />
                  : null :
                  option === 2 ?

                  step === 1 ?
                    <NftCollection setStep={setStep} />
                  : 
                  step === 2 ?
                    <AiAlgorithm setPostId={setPostId} />
                  :
                  step === 3 ?
                    <CollectionType setCollectionType={setCollectionType} collectionType={collectionType}  />
                  :
                  step === 4 ?
                    <NftPhoto  
                      image={image}
                      setImage={setImage} 
                      missing={missing}
                      setUploadedImage={setUploadedImage}
                      setFormImage={setFormImage}
                      postId={postId}
                      setLoading={setLoading}
                      setLoadingTitle={setLoadingTitle}
                      promt={promt}
                      promtNegative={promtNegative}
                      setPromt={setPromt}
                      setPromtNegative={setPromtNegative}
                      loading={loading} />
                  : 
                  step === 5 ?
                    <NftResults generatedNfts={generatedNfts} />
                  :
                  step === 6 ?
                    <NftCollectionSettings loading={loading} setCollectionName={setCollectionName} collectionName={collectionName} setImagesAmount={setImagesAmount} imagesAmount={imagesAmount} posts={posts} />
                  :
                  step === 7 ?
                    <NftSaving saved={saved} setSaved={setSaved} generateAnimation={generateAnimation} navigation={navigation} />
                  :
                  null
                  :
                  null
            }
        { option === 1 ?
          step !== 8 ?
            isKeyboardVisible || step == 6 || step == 7 || step == 0 ? null :
            <View style={styles.buttonWrapper}>
                <Pressable style={[styles.button, enabled ? styles.activeButton : null]} onPress={() => setAction()}>
                    <Text style={[styles.buttonText, enabled ? styles.activeButton : null]}>Continue</Text>
                </Pressable>
            </View> 
            :
            <View style={styles.buttonWrapper2}>
                <Pressable style={styles.button2} onPress={() => finishUpload(false)}>
                    <Text style={styles.buttonText2}>Without minting {loading ? <ActivityIndicator size="small" color={COLORS.green} /> : null}</Text>
                </Pressable>
                <Pressable style={styles.button3} onPress={() => finishUpload(true)}>
                    <Text style={styles.buttonText3}>With minting {loading ? <ActivityIndicator size="small" color={COLORS.green} /> : null}</Text>
                </Pressable>
            </View>
          :
          step !== 1 ?
          <NftButtons loading={loading} setLoading={setLoading} setStep={setStep} step={step} generateNfts={generateNfts} navigation={navigation} saveNFTsCollection={saveNFTsCollection} saveSettings={saveSettings} imagesAmount={imagesAmount} /> 
          : null
        }
        <Loading loading={loading} title={loadingTitle} /> 
        <PopUpInfo setInfoVisible={setInfoVisible} infoVisible={infoVisible} navigation={navigation} title={'Limit notice'} description={`You have already 5 posts in your profile, max allowed 5. Your next post will not be published.`} />
        </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  )
}

export default Upload

const styles = StyleSheet.create({
  containerER: {
    flex: 1,
  },
  container: {
    height: buttonHeight
  },
  wrapper: {
      marginLeft: 24,
      marginRight: 24,
  },
  logo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      textAlign: "center"
  },
  title: {
      fontSize: 26,
      fontFamily: FONTS.preety,
      color: COLORS.white,
      textAlign: "center",
  },
  title2: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 15
},
  paragraph: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    textAlign: "center",
    marginTop: 7
  },
  continue: {
    position: 'absolute',
    bottom: 45,
    marginLeft: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.green,
    padding: 10,
    width: width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  continueText: {
    color: COLORS.green,
    fontFamily: FONTS.preety,
    textAlign: "center",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.gray,
    alignSelf: 'stretch',
    textAlign: 'center',
    width: width,
    marginLeft: 16,
},
activeButton: {
  borderColor: COLORS.green,
  backgroundColor: COLORS.green,
  color: "#fff",
},
buttonText: {
    fontFamily: FONTS.medium,
    color: COLORS.gray,
    fontSize: 16
},
buttonText2: {
    fontFamily: FONTS.medium,
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 16
},
buttonText3: {
  fontFamily: FONTS.medium,
  color: "#fff",
  fontSize: 14,
  lineHeight: 16
},
buttonWrapper: {
    position: 'absolute',
    bottom: 20,
},
buttonWrapper2: {
    position: 'absolute',
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
    bottom: 0,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
    backgroundColor: "rgb(11,11,11)",
    
},
button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.white,
    width: (width2 / 2) - 25,
    alignSelf: 'stretch',
    textAlign: 'center',
},
button3: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.green,
    backgroundColor: COLORS.green,
    alignSelf: 'stretch',
    textAlign: 'center',
    width: (width2 / 2) - 25,
    marginLeft: 16,
},
buttonTextSecondary: {
    color: COLORS.gray,
    fontSize: 12,
    lineHeight: 12
},
  input: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    borderWidth: 1,
    borderColor: "rgba(65, 65, 65, 1)",
    marginBottom: 7,
    padding: 10,
    borderRadius: 2,
    marginBottom: 30,
  },
  
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 12,
  },
  listItem: {
    color: COLORS.gray,
    borderWidth: 1,
    fontSize: 15,
    borderColor: COLORS.gray,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 5,
    borderRadius: 15,
    flexGrow: 1,
    textAlign: "center",
    textTransform: "capitalize",
  },
  listItemActive: {
    color: COLORS.green,
    borderWidth: 1,
    fontSize: 15,
    borderColor: COLORS.green,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 5,
    borderRadius: 15,
    flexGrow: 1,
    textAlign: "center",
    textTransform: "capitalize",
  },
  listText: {
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    textAlign: "center",
    textTransform: "capitalize",
  },
  statusBar: {
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 25,
    marginRight: 25,
    height: 5,
    width: width - 10,
    backgroundColor: "gray",
    overflow: "hidden",
    position: "relative",
  },
  bottomBar: {
    height: 4,
    top: 0,
    position: "absolute",
    width: width - 10,
    backgroundColor: "rgba(86, 86, 88, 1)",
    borderRadius: 5
  },
  topBar: {
    height: 4,
    top: 0,
    position: "absolute",
    width: width2 / 5,
    backgroundColor: COLORS.green,
    borderRadius: 5,
  },
  hide: {
    display: "none"
  },
  show: {
    display: "flex"
  },
  processBar: {
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 4,
    paddingBottom: 20
  },
  processBarGray: {
    height: 5,
    backgroundColor: "rgba(86, 86, 88, 1)",
  },
  processBarGreen: {
    height: 5,
    backgroundColor: "#9B51E0",
    marginTop: -5,
  }
})