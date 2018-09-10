import { InfPlusCore } from './CalculationCore'

export function InfPlus(firstNum: string, secNum: string): string {
  let decimalDiff: number = 0
  let decimalLongerLength: number = 0
  let firstNumDec: string | null = null
  let secNumDec: string | null = null
  let firstNumNat: string = ""
  let secNumNat: string = ""
  let natureResult: string = ""
  let decimalResult: string | null = null
  let result: string = ""

  if(firstNum.indexOf('.') >= 0){
    firstNumNat = firstNum.substring(0, firstNum.indexOf('.'))
    firstNumDec = firstNum.substring(firstNum.indexOf('.') + 1)
  }else firstNumNat = firstNum
  if(secNum.indexOf('.') >= 0){
    secNumNat = secNum.substring(0, secNum.indexOf('.'))
    secNumDec = secNum.substring(secNum.indexOf('.') + 1)
  }else secNumNat = secNum 
  natureResult = InfPlusCore(firstNumNat, secNumNat)
  if(firstNumDec != null || secNumDec != null){
    if(firstNumDec == null) firstNumDec = "0"
    if(secNumDec == null) secNumDec = "0"
    if(firstNumDec.length != secNumDec.length){
      if(firstNumDec.length > secNumDec.length){
        decimalDiff = firstNumDec.length - secNumDec.length
        decimalLongerLength = firstNumDec.length
        for(var i = 0; i < decimalDiff; i++) secNumDec += '0'
      }else{
        decimalDiff = secNumDec.length - firstNumDec.length
        decimalLongerLength = secNumDec.length
        for(var i = 0; i < decimalDiff; i++) firstNumDec += '0'
      }
    }else{
      decimalLongerLength = firstNumDec.length;
    }
    decimalResult = InfPlusCore(firstNumDec, secNumDec)
    if(decimalResult.length > decimalLongerLength){
      decimalResult = decimalResult.substring(1)
      natureResult = InfPlusCore(natureResult, "1")
    }
  }
  decimalResult == null ? result = natureResult : result = natureResult + '.' + decimalResult

  return result
}