export function sizeInfo(sizeInKB: number) {
    const sizeInMB = sizeInKB / 1024
    if(sizeInMB >= 1024){
        const sizeInGB = sizeInMB / 1024;
        return `${roundOff(sizeInGB)} GB`;
    }
    if(sizeInKB >= 1024){
        return `${roundOff(sizeInMB)} MB`;
    }
    return `${roundOff(sizeInKB)} KB`;
}

export function roundOff(num:number){
    return Math.round((num + Number.EPSILON) * 100) / 100
}