
declare var $;
declare var chrome;
class Dmk {
    user: string
    content: string
}
let $qie = (dmkArr) => {
    let $dmkArr1 = $('.jschartli')
    // console.log(dmkArr)
    let tmpDmkArr: Array<Dmk> = []
    let decode = ($dmkArr) => {
        for (var i = 0; i < $dmkArr.length; i++) {
            var t = $dmkArr[i];
            let dmkContent = $(t).find('span.text-cont')
            if (dmkContent.length) {
                dmkContent = dmkContent[0].innerText
            }
            else {
                dmkContent = $(t).find('span.m')[0].innerText
            }
            let user = $(t).find(".nick")
            if (user.length)
                user = user[0].innerText
            if (user) {
                let o = new Dmk()
                o.user = user
                o.content = dmkContent
                tmpDmkArr.push(o)
            }
            // console.log(dmkContent,a)
        }
        // console.log(o)
    }
    decode($dmkArr1)
    // decode($('p .my-cont'))
    if (dmkArr.length != tmpDmkArr.length) {
        dmkArr = tmpDmkArr
        return true
        // console.log(dmkArr)
    }
    return
}
class DmkLeecher {
    dmkArr: Array<Dmk>
    limit: number
    host: string
    constructor() {
        console.log('host:', window.location.host);
        let host = window.location.host
        this.host = host
        let hostMap = { 'live.qq.com': $qie }
        this.dmkArr = []
        setInterval(() => {
            if (hostMap[host](this.dmkArr)) {
                this.send()
            }
        }, 1000)
    }
    send() {
        $.post('/dmkArr', { host: this.host, dmkArr: this.dmkArr })
    }
}

new DmkLeecher()