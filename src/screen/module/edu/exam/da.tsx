import { TagItem } from "../../tag/da";

export enum ExamStatus {
    test = 0,
    real = 1,
}

export interface ExamItem {
    id?: string,
    name?: string,
    dateCreated?: number,
    code?: string,
    level?: number,
    lessonId?: string,
    customerId?: string,
    /** ExamStatus */
    status?: number,
    quantity?: number,
    time?: number,
    dateStart?: number,
    topicId?: string,
    courseTags?: Array<TagItem>,
}

