function Validator() {
    let num = 0
    let value = true
    this.targetArg = undefined
    Object.defineProperty(this, 'value', {
        get() {
            if (num) {
                num = 0
                return value
            } else {
                return false
            }
        },
        set(arg) {
            if (value) {
                num = ++num
                value = arg
                return arg
            } else {
                return false
            }
        }
    })
}
// 邮箱验证
Validator.prototype.isEmail = function(arg) {
        if (!this.targetArg) {
            this.targetArg = arg
        }
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        this.value = reg.test(arg)
        return this
    }
    // 手机电话验证
Validator.prototype.isPhone = function(arg) {
        if (!this.targetArg) {
            this.targetArg = arg
        }
        const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
        this.value = reg.test(this.targetArg)
        return this
    }
    // 数字验证
Validator.prototype.isNumber = function(arg) {
        if (!this.targetArg) {
            this.targetArg = arg
        }
        this.value = typeof this.targetArg === 'number'
        return this
    }
    // 中文验证
Validator.prototype.isNumber = function(arg) {
    if (!this.targetArg) {
        this.targetArg = arg
    }
    const reg = /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/
    this.value = reg.test(this.targetArg)
    return this
}

// const v = new Validator()
// console.log('数据验证', v.isNumber(13036592217).isPhone().value)