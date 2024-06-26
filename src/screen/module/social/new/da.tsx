import { TagItem } from "../../tag/da";

export interface NewItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    title?: string,
    titleAscii?: string,
    pictureId?: number,
    description?: string,
    dateUpdated?: number,
    displayOrder?: number,
    clicked?: number,
    noIndex?: boolean,
    startDateDisplay?: number,
    isShow?: boolean,
    isHot?: boolean,
    isAllowComment?: boolean,
    isFast?: boolean,
    languageId?: string,
    isDeleted?: boolean,
    price?: number,
    modifier?: string,
    customerId?: string,
    topicId?: string,
    status?: number,
    cateId?: string,
    centerId?: string,
    newsTags?: Array<TagItem>,
}

export enum NewStatus {
    draft = 0,
    published = 1
}