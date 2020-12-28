// 无限加载
const loadMore = (args) => {
    let {
        apiFunc,
        params,
        handleFunc,
        loadingText = '加载中...'
    } = args
    let noData = false,
        list = [],
        total = 0
    uni.showLoading({
        title: loadingText
    })
    return new Promise((resolve, reject) => {
        apiFunc(params)
            .then(res => {
                if (res && res.data && res.data.code == 200) {
                    if (res.data.data.totalCount == 0) {
                        noData = true
                    } else {
                        noData = false
                        total = res.data.data.totalCount
                        list = handleFunc ? handleFunc(res.data.data.result) : res.data.data.result
                    }
                    uni.hideLoading()
                    uni.stopPullDownRefresh()
                    resolve({
                        noData,
                        list,
                        total,
                        pageIndex: ++params.pageIndex
                    })
                } else {
                    reject('接口异常')
                }
            })
            .catch((e) => {
                uni.hideLoading()
                uni.stopPullDownRefresh()
                reject(e)
            })
    })
}
export default loadMore
