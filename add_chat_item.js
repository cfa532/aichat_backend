((request, args)=>{
    try {
        const CHAT_CASE_KEY = "CHAT_CASE_LIST"   // set of case IDs
        const CHAT_HISTORY_KEY = "CHAT_HISTORY_"            // set of chat I
        const APP_ID = request["aid"]       // App ID assigned by Leither upon publication
        const APP_EXT = "us.leither.guokai"
        let APP_MARK = request["userid"]
        let authSid = lapi.BELoginAsAuthor()
        let userMid = lapi.MMCreate(authSid, APP_ID, APP_EXT, APP_MARK, 2, 0x07276704)
        let mmsid = lapi.MMOpen(authSid, userMid, "cur")

        // add a new ChatItem to the Case.
        let ci = JSON.parse(request["chatitem"])
        let caseId = request["caseid"]
        let timestamp = Date.now()
        lapi.Hset(mmsid, CHAT_HISTORY_KEY+caseId, timestamp, ci)

        // update timestamp of the current case
        let caseObj = lapi.Hget(mmsid, CHAT_CASE_KEY, caseId)
        caseObj.timestamp = timestamp
        lapi.Hset(mmsid, CHAT_CASE_KEY, caseId, caseObj)
        lapi.MMBackup(authSid, userMid, "", "delref=true")
        console.log("Item added", JSON.stringify(ci))
    } catch(e) {
        console.error("backup_mimei error:", JSON.stringify(request), e)
    }
})(request, args)