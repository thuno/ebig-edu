import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { LessonType, editorConfiguration } from "../../../../assets/const/const-list"
import { FilledChat, FilledCircleQuestion, FilledEdit, FilledHtmlCssCode, FilledHyperlink, FilledIndicator, FilledLogoYoutube, FilledResizeV, FilledText, FilledTrashCan } from "../../../../assets/const/icon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faChevronDown, faChevronRight, faEllipsisVertical, faEye, faGear } from "@fortawesome/free-solid-svg-icons"
import { Checkbox, CustomCKEditor, Popup, Text, closePopup, showPopup } from "../../../../component/export-component"

export default function FormEditLesson() {
    const { id } = useParams()
    const ref = useRef()
    const [data, setData] = useState({ id: id, type: LessonType.task })

    const popupMoreAction = (ev) => {
        const offset = ev.target.getBoundingClientRect()
        showPopup({
            ref: ref,
            clickOverlayClosePopup: true,
            style: { left: `${offset.x + offset.width + 4}px`, top: `${offset.y}px` },
            content: <div className="more-action-popup col">
                <button type="button" className="row" >
                    <FilledEdit />
                    <Text className="label-4">Sửa tên</Text>
                </button>
                <button type="button" className="row" >
                    <FilledChat />
                    <Text className="label-4">Tắt bình luận của học viên</Text>
                </button>
                <button type="button" className="row" onClick={() => {
                    closePopup(ref)
                }}>
                    <FilledTrashCan color="#E14337" />
                    <Text className="label-4" style={{ color: '#E14337' }}>Xóa bài học</Text>
                </button>
            </div>
        })
    }

    useEffect(() => {
        // getData by id
    }, [])

    const renderUI = () => {
        switch (data.type) {
            case LessonType.video:
                return <EditVideo data={data} />
            case LessonType.text:
                return <EditText data={data} />
            case LessonType.task:
                return <EditTask data={data} />
            default:
                return <div></div>;
        }
    }

    return <div className="form-edit-lesson-content row" >
        <Popup ref={ref} />
        <div className="col details-content-block col16 col20-md col20-sm" style={{ gap: '3.2rem', }}>
            <div className="row" style={{ width: '100%', gap: '0.8rem' }}>
                <div className='col header-breadcum' >
                    <div className='row' style={{ gap: '0.8rem' }}>
                        <div className='button-text-6'>Danh sách bài học</div>
                        <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '1.2rem' }} />
                        <div className='button-text-6'>Phần 1: Tổng quan và giới thiệu chung</div>
                    </div>
                    <Text className='heading-5'>Phần 1: Tổng quan và giới thiệu chung</Text>
                    <button type="button" className="row" style={{ gap: '0.8rem' }}>
                        <FilledLogoYoutube />
                        <div className="button-text-3">Video bài giảng</div>
                        <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '1.2rem', color: '#00204D99' }} />
                    </button>
                </div>
                <button type="button" className="row button-grey">
                    <FontAwesomeIcon icon={faEye} style={{ fontSize: '1.4rem' }} />
                    <Text className="button-text-3" >Xem trước</Text>
                </button>
                <button type="button" className="row button-grey">
                    <FontAwesomeIcon icon={faBars} style={{ fontSize: '1.4rem' }} />
                    <Text className="button-text-3" >Danh sách bài học</Text>
                </button>
                <button type="button" className="row button-grey" style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%', justifyContent: 'center' }} onClick={popupMoreAction}>
                    <FontAwesomeIcon icon={faEllipsisVertical} style={{ fontSize: '1.4rem' }} />
                </button>
            </div>
            <div className="col" style={{ flex: 1, height: '100%', width: '100%', overflow: 'hidden auto' }}>
                {renderUI()}
            </div>
        </div>
        <div className="row content-edit-action-block col8 col4-md col4-sm" style={{ borderLeft: 'var(--border-grey1)' }}>
            <div className="row group-action-edit">
                {data.type === LessonType.video ? <button type="button" className="col col6 col8-xxl col8-xl col12-lg col24-md col24-sm" >
                    <FilledText width="2.4rem" height="2.4rem" />
                    <div className="subtitle-3">Text editor</div>
                </button> : null}
                <button type="button" className="col col6 col8-xxl col8-xl col12-lg col24-md col24-sm" >
                    <FilledCircleQuestion width="2.4rem" height="2.4rem" />
                    <div className="subtitle-3">Quizz</div>
                </button>
                <button type="button" className="col col6 col8-xxl col8-xl col12-lg col24-md col24-sm" >
                    <FilledHyperlink width="2.4rem" height="2.4rem" />
                    <div className="subtitle-3">Resource</div>
                </button>
                <button type="button" className="col col6 col8-xxl col8-xl col12-lg col24-md col24-sm" >
                    <FilledHtmlCssCode width="2.4rem" height="2.4rem" />
                    <div className="subtitle-3">Embed</div>
                </button>
            </div>
        </div>
    </div>
}

const EditVideo = ({ data }) => {
    const [listVideo, setListVideo] = useState([])

    useEffect(() => {
        setListVideo(data?.list ?? [])
    }, [data])

    return <div></div>
}

const EditText = ({ data }) => {
    const [content, setContent] = useState('')
    useEffect(() => {
        setContent(data?.content ?? '')
    }, [data])

    return <CustomCKEditor
        config={editorConfiguration}
        style={{ flex: 1, height: '100%' }}
        value={content}
    />
}

const EditTask = ({ data }) => {
    const [listQuestion, setListQuestion] = useState([])

    useEffect(() => {
        setListQuestion(data?.list ?? [{}, {}, {}])
    }, [data])

    return <div className="col" style={{ gap: '3.2rem' }}>
        <div className="row" style={{ gap: '0.8rem', paddingTop: '1.2rem', borderTop: 'var(--border-grey1)' }}>
            <button type="button" className="button-grey row">
                <FontAwesomeIcon icon={faGear} style={{ fontSize: '1.4rem' }} />
                <Text className="button-text-3">Cài đặt tính điểm</Text>
            </button>
            <button type="button" className="button-grey row">
                <FilledResizeV />
                <Text className="button-text-3">Thu gọn</Text>
            </button>
        </div>
        {listQuestion.map((quest, i) => <div key={'quest-' + i} className="quest-block-infor row" >
            <div className="row btn-sort" style={{ padding: '0.4rem', position: 'absolute' }}><FilledIndicator /></div>
            <div className="col" style={{ flex: 1, width: '100%', gap: '1.2rem' }}>
                <div className="row" style={{ gap: '0.8rem' }}>
                    <Text className="highlight-6">Câu hỏi 1</Text>
                    <Text className="body-3" style={{ color: '#00204D99' }}>(Chọn nhiều hơn 1 câu trả lời)</Text>
                </div>
                <Text className="button-text-1" style={{ '--max-line': 100 }}>Đâu là nhận xét đúng về trường hợp abcdjdf?</Text>
                <div className="row" style={{ gap: '0.8rem' }}>
                    <Checkbox size={'1.6rem'} style={{ borderRadius: '50%' }} />
                    <Text className="label-4">A. Lorem Ipsum is simply dummy text of the printing</Text>
                </div>
                <div className="row" style={{ gap: '0.8rem' }}>
                    <Checkbox size={'1.6rem'} style={{ borderRadius: '50%' }} />
                    <Text className="label-4">B. Lorem Ipsum is simply dummy text of the printing</Text>
                </div>
                <div className="row" style={{ gap: '0.8rem' }}>
                    <Checkbox size={'1.6rem'} style={{ borderRadius: '50%' }} />
                    <Text className="label-4">C. Lorem Ipsum is simply dummy text of the printing</Text>
                </div>
                <div className="row" style={{ gap: '0.8rem' }}>
                    <Checkbox size={'1.6rem'} style={{ borderRadius: '50%' }} />
                    <Text className="label-4">D. Lorem Ipsum is simply dummy text of the printing</Text>
                </div>
            </div>
            <button key={'suffix-action-btn1'} type="button" onClick={() => { }} >
                <FilledEdit />
            </button>
            <button key={'suffix-action-btn2'} type="button" onClick={() => { }}>
                <FilledTrashCan />
            </button>
        </div>)}
    </div>
}