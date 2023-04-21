export class urlParser{
    findBaseUrl(url){
        let pathArray = url.split('/')
        return pathArray[0] + '//' + pathArray[2]
    }

    findDomain(url){
        let pathArray = url.split('/')
        let domainArray = pathArray[2].split('.')
        return domainArray[1];
    }
}