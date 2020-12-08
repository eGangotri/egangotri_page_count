export function sizeInfo(sizeInBytes: number) {
    const sizeInKB = sizeInBytes /1024
    const sizeInMB = sizeInKB / 1024;

    if(sizeInKB < 1024){
        return `${roundOff(sizeInKB)} KB`;
    }

    else if(sizeInMB >= 1024){
        const sizeInGB = sizeInMB / 1024;
        return `${roundOff(sizeInGB)} GB`;
    }
    else{
        return `${roundOff(sizeInMB)} MB`;
    }
}

export function roundOff(num:number){
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

