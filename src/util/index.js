// 二维码参数解析
function decodeUrlData(data) {
    let scene = {}
    decodeURIComponent(data).split('&').forEach(item => {
        let arr = item.split('=')
        scene[arr[0]] = arr[1]
    })
    return scene
}
// 返回单个查询参数/全部
const queryParams = (vm, key, all = false) => {
    let query = vm.$mp.query
    if (vm.$mp.query && vm.$mp.query.scene) { // 二维码解析
        query = decodeUrlData(vm.$mp.query.scene)
    }
    if (all) {
        return query
    }
    if (query.hasOwnProperty(key)) {
        return query[key]
    }
    return ''
}

/**
 * 跳转 A:跳转到webview; B:应用内跳转; C:跳转其它小程序;
 * 需用配合后端，灵活调整
 * @param data
 */
function linkJump(data) {
    switch (Number(data.type)) {
        case 1:
            uni.navigateTo({
                url: `/pages-common/pages/web-view/index?url=${data.url}`
            });
            break
        case 2:
            uni.navigateTo({
                url: data.url
            });
            break
        case 3:
            uni.navigateToMiniProgram({
                appId: data.appId,
                path: data.url
            })
            break
        default:
            break;
    }
}
export {
    decodeUrlData,
    queryParams,
    linkJump
}
