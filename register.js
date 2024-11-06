((request, args)=>{
    // register a new user.
    try {
        const APP_ID = request["aid"]       // App ID assigned by Leither upon publication
        const APP_EXT = "us.leither.guokai"
        const USER_LIST_KEY = "registered_user_list"
        let APP_MARK = "Guokai contracts"

        let authSid = lapi.BELoginAsAuthor()
        let user = JSON.parse(request["user"])
        // create user mimei based on username
        let userMid = lapi.MMCreate(authSid, APP_ID, APP_EXT, user.username, 2, 0x07276704)
        let mmsid = lapi.MMOpen(authSid, userMid, "cur")    // open non-exist "last" will cause exception
        if (lapi.Hget(mmsid, USER_LIST_KEY, username))
            return null     // username taken

        let appMid = lapi.MMCreate(authSid, APP_ID, APP_EXT, APP_MARK, 2, 0x07276704)
        mmsid = lapi.MMOpen(authSid, appMid, "cur")
        user.mid = userMid
        user.appId = appMid
        lapi.Hset(mmsid, USER_LIST_KEY, user.username, user)    // record user in app mimei
        lapi.MMBackup(authSid, appMid, '', "delref=true")
        lapi.MiMeiPublish(authSid, "", appMid)
        console.log("register OK.", JSON.stringify(user))
    } catch(e) {
        console.error("register error:", JSON.stringify(request), e)
    }
})(request, args)