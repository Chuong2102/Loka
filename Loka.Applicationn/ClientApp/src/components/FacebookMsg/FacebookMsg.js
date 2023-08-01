import { FacebookProvider, CustomChat } from 'react-facebook';

function FacebookMsg() {
    return (
        <FacebookProvider appId="651447766574185" chatSupport>
          <CustomChat pageId="100546566313709" minimized={true}/>
        </FacebookProvider>    
      );
}

export default FacebookMsg;