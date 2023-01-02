import pdfLogin from './login'
import getfiledContract from './contract/scanned'
import getUnfiledContract from './contract/beScanned'
import viewContractInfo from './numberQuery'
import fileContract from './contractFiling'

const METHOD = {
    pdfLogin,
    getfiledContract,
    getUnfiledContract,
    viewContractInfo,
    fileContract,
}

export default (req) => {
    const searchParams = req.url.searchParams
    const method = searchParams.get('method')
    const result = METHOD[method];
    return result ? result(req) : {}
}
