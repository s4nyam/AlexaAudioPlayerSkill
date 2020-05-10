



const alexa = require('ask-sdk');
const constants = require('./constants');



const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const playbackInfo = await getPlaybackInfo(handlerInput);
    let message;
    let reprompt;

    if (!playbackInfo.hsion) {
      message = 'Startira - <audio src="https://dl3.pushbulletusercontent.com/WgLYDZOFvqKHrjtYJonn8SjCgzN1gmcx/elephant.mp3" />, You can say, play the stories, to begin.';
      reprompt = 'You cies, to begin.';
    } else {
      playbackInfo.inPl;
      message = `'<audishbulletusercontent.com/WgLYDZOFvqKHrjtYJonn8SjCgzN1gmcx/elephant.mp3" />', You were listening to ${constants.audioData[playbackInfo.playOrder[playbackInfo.index]].title}. Would you like to resume?`;
      reprompt = 'You cor no to play from the top.';
    }

    return handlerInput.responseBuilder
      .speak(message)
      .reprompt(reprompt)
      .getResponse();
  },
};

const AudioPlayerEventHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type.startsWith('AudioPlayer.');
  },
  async handle(handlerInput) {
    const {
      requestEnvelope,
      attributesManager,
      responseBuilder
    } = handlerInput;
    const audioPlayerEventName = requestEnvelope.request.type.split('.')[1];
    const {
      playbackSetting,
      playbackInfo
    } = await attributesManager.getPersistentAttributes();

    switch (aud
      case 'Pla
        playbachandlerInput);
        playbacIndex(handlerInput);
        playbac = true;
        playbacckSession = true;
        break;
      case 'Pla
        playbac = false;
        playbacckSession = false;
        playbacd = false;
        break;
      case 'PlaybackStopped':
        playbackInfo.token = getToken(handlerInput);
        playbackInfo.index = await getIndex(handlerInput);
        playbackInfo.offsetInMilliseconds = getOffsetInMilliseconds(handlerInput);
        break;
      case 'PlaybackNearlyFinished':
        {
          if (playbackInfo.nextStreamEnqueued) {
            break;
          }

          const enqueueIndex = (playbackInfo.index + 1) % constants.audioData.length;

          if (enqueueIndex === 0 && !playbackSetting.loop) {
            break;
          }

          playbackInfo.nextStreamEnqueued = true;

          const enqueueToken = playbackInfo.playOrder[enqueueIndex];
          const playBehavior = 'ENQUEUE';
          const podcast = constants.audioData[playbackInfo.playOrder[enqueueIndex]];
          const expectedPreviousToken = playbackInfo.token;
          const offsetInMilliseconds = 0;

          responseBuilder.addAudioPlayerPlayDirective(
            playBehavior,
            podcast.url,
            enqueueToken,
            offsetInMilliseconds,
            expectedPreviousToken,
          );
          break;
        }
      case 'PlaybackFailed':
        playbackInfo.inPlaybackSession = false;
        console.log('Playback Failed : %j', handlerInput.requestEnvelope.request.error);
        return;
      default:
        throw new Error('Should never reach here!');
    }

    return responseBuilder.getResponse();
  },
};

const CheckAudioInterfaceHandler = {
  async canHandle(handlerInput) {
    const audioPlayerInterface = ((((handlerInput.requestEnvelope.context || {}).System || {}).device || {}).supportedInterfaces || {}).AudioPlayer;
    return audioPlayerInterface === undefined
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Sorry, this skill is not supported on this device')
      .withShouldEndSession(true)
      .getResponse();
  },
};

const StartPlaybackHan
  async canHandle(hand
    const playbackInfoackInfo(handlerInput);
    const request = hatEnvelope.request;

    if (!playbackInfo.) {
      return request.tquest' && request.intent.name === 'PlayAudio';
    }
    if (request.type =oller.PlayCommandIssued') {
      return true;
    }

    if (request.type =') {
      return request.ilayAudio' ||
        request.intent.name === 'AMAZON.ResumeIntent';
    }
  },
  handle(handlerInput) {
    return controller.play(handlerInput);
  },
};

const NextPlaybackHandler = {
  async canHandle(handlerInput) {
    const playbackInfo = await getPlaybackInfo(handlerInput);
    const request = handlerInput.requestEnvelope.request;

    return playbackInfo.inPlaybackSession &&
      (request.type === 'PlaybackController.NextCommandIssued' ||
        (request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NextIntent'));
  },
  handle(handlerInput) {
    return controller.playNext(handlerInput);
  },
};

const PreviousPlaybackHandler = {
  async canHandle(handlerInput) {
    const playbackInfo = await getPlaybackInfo(handlerInput);
    const request = handlerInput.requestEnvelope.request;

    return playback &&
      (request.typeer.PreviousCommandIssued' ||
        (request.ty && request.intent.name === 'AMAZON.PreviousIntent'));
  },
  handle(handlerInp
    return controllrInput);
  },
};

const PausePlayback
  async canHandle(h
    const playbackIkInfo(handlerInput);
    const request =nvelope.request;

    return playback &&
      request.type 
      (request.intent.name === 'AMAZON.StopIntent' ||
        request.intent.name === 'AMAZON.CancelIntent' ||
        request.intent.name === 'AMAZON.PauseIntent');
  },
  handle(handlerInput) {
    return controller.stop(handlerInput);
  },
};

const LoopOnHandler = {
  async canHandle(handlerInput) {
    const playbackInfo = await getPlaybackInfo(handlerInput);
    const request = handlerInput.requestEnvelope.request;

    return playbackInfo.inPlaybackSession &&
      request.type 
      request.intenent';
  },
  async handle(hand
    const playbackSattributesManager.getPersistentAttributes().playbackSetting;

    playbackSetting

    return handlerI
      .speak('Loop 
      .getResponse(
  },
};

const LoopOffHandle
  async canHandle(h
    const playbackIhandlerInput);
    const request =e.request;

    return playback
      request.type 
      request.intentent';
  },
  async handle(handlerInput) {
    const playbackSetting = await handlerInput.attributesManager.getPersistentAttributes().playbackSetting;

    playbackSetting.loop = false;

    return handlerInput.responseBuilder
      .speak('Loop turned off.')
      .getResponse();
  },
};

const ShuffleOnHandler = {
  async canHandle(hInput) {
    const playbackIawait getPlaybackInfo(handlerInput);
    const request =erInput.requestEnvelope.request;

    return playbacknPlaybackSession &&
      request.type === 'IntentRequest' &&
      request.intent.name === 'AMAZON.ShuffleOnIntent';
  },
  async handle(handlerInput) {
    const {
      playbackInfo,
      playbackSetting,
    } = await ha.attributesManager.getPersistentAttributes();

    playbackSette = true;
    playbackInfo = await shuffleOrder();
    playbackInfo;
    playbackInfoilliseconds = 0;
    playbackInfo.playbackIndexChanged = true;
    return controller.play(handlerInput);
  },
};

const ShuffleOffHandler = {
  async canHandle(handlerInput) {
    const playbackInfo = await getPlaybackInfo(handlerInput);
    const request = handlerInput.requestEnvelope.request;

    return playbackInfo.i
      request.type === 'I
      request.intent.namet';
  },
  async handle(handlerInp
    const {
      playbackInfo,
      playbackSetting,
    } = await handlerInpustentAttributes();

    if (playbackSetting.s
      playbackSetting.shu
      playbackInfo.index ybackInfo.index];
      playbackInfo.playOrder = [...Array(constants.audioData.length).keys()];
    }

    return controller.play(handlerInput);
  },
};

const StartOverHandler = {
  async canHandle(handlerInput) {
    const playbackInfo = await getPlaybackInfo(handlerInput);
    const request = handlerInput.requestEnvelope.request;

    return playbacSession &&
      request.typeest' &&
      request.inteZON.StartOverIntent';
  },
  async handle(handlerInput) {
    const playbackInfo = await getPlaybackInfo(handlerInput);

    playbackInfo.offsetInMilliseconds = 0;

    return controller.play(handlerInput);
  },
};

const YesHandler = {
  async canHandle(handlerInput) {
    const plybackInfo(handlerInput);
    const reestEnvelope.request;

    return !ssion && request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent';
  },
  handle(han
    return cut);
  },
};

const NoHand
  async canH
    const plybackInfo(handlerInput);
    const reestEnvelope.request;

    return !ssion && request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NoIntent';
  },
  async handle(handlerInput) {
    const playbackInfo = await getPlaybackInfo(handlerInput);

    playbackInfo.index = 0;
    playbackInfo.offsetInMilliseconds = 0;
    playbackInfo.playbackIndexChanged = true;
    playbackInfo.hasPreviousPlaybackSession = false;

    return controller.play(handlerInput);
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    return handleput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInesvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  async handle(handlerInput) {
    const playbackInfo = await getPlaybackInfo(handlerInput);
    let message;

    if (!playbackInfo.hasPreviousPlaybackSession) {
      messlcome to the Panchtantra stories for kids. You can say, begin the stories to begin the Player.';
    } elseybackInfo.inPlaybackSe{
      message = `You were ling to ${ts.audioData[playbackInfo.index].title}. Would you like to resume?`;
    } else {
    }

    return handlerInput.responseBuilder
      .speak(message)
      .reprompt(message)
      .getResponse();
  },
};

const ExitHandler = {
  async canHandle(handlerInput) {
    const playbackInfo = await getPlaybackInfo(handlerInput);
    const request = handlerInput.requestEnvelope.request;


    return !playbackInfo.inPlaybackSession &&
      request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.StopIntent' ||
        request.intent.name === 'AMAZON.CancelIntent');
  },
  handle(handlerInput) {
    return handlerIn
      .speak('Goodby
      .getResponse()
  },
};

const SystemExceptio
  canHandle(handlerI
    return handlerInype === 'System.ExceptionEncountered';
  },
  handle(handlerInpu
    console.log(`SyshandlerInput.requestEnvelope.request.reason}`);
  },
};

const SessionEndedRe
  canHandle(handlerI
    return handlerInype === 'SessionEndedRequest';
  },
  handle(handlerInpu
    console.log(`SesdlerInput.requestEnvelope.request.reason}`);

    return handlerInse();
  },
};
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    const message = 'Sorry, this is not a valid command. Please say help to hear what you can say.';

    return handlerInput.responseBuilder
      .speak(message)
      .reprompt(message)
      .getResponse();
  },
};

/* INTERCEPTORS */

const LoadPersistentAttributesRequestInterceptor = {
  async process(handlerInput) {
    const persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();

    // Check if user is invoking the skill the first time and initialize preset values
    if (Object.keentAttributes).length === 0) {
      handlerInpuesManager.setPersistentAttributes({
        playbackS
          loop: f
          shuffle
        },
        playbackI
          playOrdray(constants.audioData.length).keys()],
          index: 
          offsetInds: 0,
          playbacged: true,
          token: 
          nextStrd: false,
          inPlaybackSession: false,
          hasPreviousPlaybackSession: false,
        },
      });
    }
  },
};

const SavePersistentAttributesResponseInterceptor = {
  async process(handlerInput) {
    await handlerInput.attributesManager.savePersistentAttributes();
  },
};

/* HELPER FUNCTIONS */

async function getPlaybackInfo(handlerInput) {
  const atput.attributesManager.getPersistentAttributes();
  return a
}

async funcnput) {
  const {
    reques
    attrib
  } = hand
  const plbackInfo(handlerInput);

  if (requ== 'IntentRequest' && playbackInfo.playbackIndexChanged) {
    playbad = false;
    return true;
  }
  return false;
}

const controller = {
  async play(handlerInput) {
    const {
      attributesManager,
      responseBuilder
    } = handlerInput;

    const playbackInfo = await getPlaybackInfo(handlerInput);
    const {
      playOrder,
      offsetIn
      index
    } = playba

    const play
    const podcayOrder[index]];
    const toke
    playbackIne;

    responseBu
      .speak(`
      .withSho
      .addAudiavior, podcast.url, token, offsetInMilliseconds, null);

    if (await {
      const ca.title}`;
      const cardContent = `Playing ${podcast.title}`;
      responseBuilder.withSimpleCard(cardTitle, cardContent);
    }

    return rnse();
  },
  stop(handl
    return hlder
      .addAu)
      .getRe
  },
  async play
    const {
      playba
      playba
    } = awaiesManager.getPersistentAttributes();

    const ne.index + 1) % constants.audioData.length;

    if (nextkSetting.loop) {
      return handlerInput.responseBuilder
        .speak('You have reached the end of the playlist')
        .addAudioPlayerStopDirective()
        .getResponse();
    }

    playbackInfo.index = nextIndex;
    playbackInfo.offsetInMilliseconds = 0;
    playbackInfo.playbackIndexChanged = true;

    return this.play(handlerInput);
  },
  async playPrevious(handlerInput) {
    const {
      playbackInfo,
      playbackSetting,
    } = await handlerInput.attributesManager.getPersistentAttributes();

    let previousIndex = playbackInfo.index - 1;

    if (previousIndex === -1) {
      if (playbackSetting.loop) {
        previousIndex += constants.audioData.length;
      } else {
        return handlerInput.responseBuilder
          .speak('You have reached the start of the playlist')
          .addAudioPlayerStopDirective()
          .getResponse();
      }
    }

    playbackInfo.index = previousIndex;
    playbackInfo.offsetInMilliseconds = 0;
    playbackInfo.playbackIndexChanged = true;

    return this.play(handlerInput);
  },
};

function getToken(han
  // Extracting tokenquest.
  return handlerInputquest.token;
}

async function getInd
  // Extracting indexeived in the request.
  const tokenValue = ut.requestEnvelope.request.token, 10);
  const attributes = attributesManager.getPersistentAttributes();

  return attributes.per.indexOf(tokenValue);
}

function getOffsetInMInput) {
  // Extracting offsetInMilliseconds received in the request.
  return handlerInput.requestEnvelope.request.offsetInMilliseconds;
}

function shuffleOrder() {
  const array = [...Array(constants.audioData.length).keys()];
  let currentIndex = array.length;
  let temp;
  let randomIndex;
  // Algorithm : Fisher-Yates shuffle
  return new Promise((resolve) => {
    while (currentIndex >= 1) {
      ran= Math.floor(Math.random() * currentIndex);
      cur -= 1;
      tem[currentIndex];
      arrtIndex] = array[randomIndex];
      arrIndex] = temp;
    }
    resolve(array);
  });
}

const skillBuilder = alexa.SkillBuilders.standard();
exports.handler = skillBuilder
  .addRequestHandlers(
    CheckAudioInterfaceHandler,
    LaunchRequestHandler,
    HelpHandler,
    SystemExceptionHandler,
    SessionEndedRequestHandler,
    YesHan
    NoHand
    StartPkHandler,
    NextPlHandler,
    PreviobackHandler,
    PausePkHandler,
    Loopandler,
    LoopHandler,
    ShufOnHandler,
    ShufOffHandler,
    StarerHandler,
    Exitdler,
    AudioPlayerEventHandler
  )
  .addRequestInterceptors(LoadPersistentAttributesRequestInterceptor)
  .addRptors(SavePersistentAttributesResponseInterceptor)
  .addErrorHandler)
  .withe(true)
  .withtants.skill.dynamoDBTableName)
  .lambda();
