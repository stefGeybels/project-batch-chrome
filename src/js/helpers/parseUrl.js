export class urlParser{
    findBaseUrl(url){
        if(url == null){
            return ''
        }

        let pathArray = url.split('/')
        return pathArray[0] + '//' + pathArray[2]
    }

    findDomain(url){
        if(url == null){
            return ''
        }
        
        let pathArray = url.split('/')
        let domainArray = pathArray[2].split('.')
        return domainArray[1];
    }
}