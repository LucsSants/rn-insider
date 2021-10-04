import {Share} from 'react-native'

const onShare = async (title, message, url) => {
const messageAndUrl = `${message}\n${url}`
try {
  const result= await Share.share({
    title: title,
    message: messageAndUrl,  
  }, {
    subject: title
  }
  )
  if (result.action === Share.sharedAction) {
    if(result.activityType) {

    } else {
      //shared
    }
  } else if (result.action === Share.dismissedAction) {

  }
} catch(error) {
  console.log(error)
}
}

export default {onShare};