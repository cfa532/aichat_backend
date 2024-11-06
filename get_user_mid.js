((request, args)=>{
    // register a new user.
    try {
        const APP_ID = request["aid"]       // App ID assigned by Leither upon publication
        const APP_EXT = "us.leither.guokai"
        let authSid = lapi.BELoginAsAuthor()
        return lapi.MMCreate(authSid, APP_ID, APP_EXT, request["userid"], 2, 0x07276704)
    } catch(e) {
        console.error("get_user_mid error:", JSON.stringify(request), e)
    }
})(request, args)