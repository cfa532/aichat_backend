((request, args)=>{
    try {
        const APP_ID = request["aid"]       // App ID assigned by Leither upon publication
        const APP_EXT = "us.leither.guokai"
        let APP_MARK = "Guokai contracts"

        let authSid = lapi.BELoginAsAuthor()
        let appMid = lapi.MMCreate(authSid, APP_ID, APP_EXT, APP_MARK, 2, 0x07276704)
        let newVer = lapi.MMBackup(authSid, appMid, '', "delref=true")
        console.log("Backup new ver=", JSON.stringify(newVer))
    } catch(e) {
        console.error("backup_mimei error:", JSON.stringify(request), e)
    }
})(request, args)