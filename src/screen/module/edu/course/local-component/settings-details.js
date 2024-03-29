import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from "react-router-dom";
import { FilledSendMessage } from '../../../../../assets/const/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { extendView } from '../../../../../assets/const/const-list';
import { Checkbox, Text } from '../../../../../component/export-component';
import { CourseController } from '../controller';
import FormEditLesson from './edit-lesson';
import CourseCurriculum from './course-curriculum';
import Overview from './overview';

export default function CourseDetails() {
    const { id } = useParams()
    const location = useLocation()
    const [selectedView, setSelectedView] = useState({ slug: 'overview' })
    const [listView, setListView] = useState(extendView.filter(e => e.link === 'edu/school/course/details').map(e => JSON.parse(JSON.stringify(e))))
    const [data, setData] = useState()

    const checkValidInforToExport = (courseItem) => {
        let needUpdate = false
        const updateListView = listView.map(e => {
            if (!e.valid) {
                switch (e.slug) {
                    case 'overview':
                        const checkProps = ['name', 'topicId', 'level', 'targets', 'thumbnailId', 'price']
                        e.valid = checkProps.every(props => courseItem[props] != null)
                        needUpdate = true
                        break;
                    case 'textbook':
                        e.valid = courseItem.courseLessons?.length ? true : false
                        needUpdate = true
                        break;
                    default:
                        break;
                }
            }
            return e
        })
        if (needUpdate) setListView(updateListView)

    }

    useEffect(() => {
        const pathFragment = location.pathname.split("/")
        let newSelectedView = listView.find(e => pathFragment.includes(e.slug))
        setSelectedView(newSelectedView)
        if (id) {
            CourseController.getById(id).then(res => {
                if (res) setData(res)
                checkValidInforToExport(res)
            })
        }
    }, [location.pathname])

    return <div className="details-view-container col" >
        <div className='details-view-header row' >
            <div className='col header-breadcum' >
                <div className='row' style={{ gap: '0.8rem' }}>
                    <div className='button-text-6'>Danh sách Course</div>
                    <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: '1.2rem' }} />
                    <div className='button-text-6 selected'>Tạo mới Course</div>
                </div>
                <div className='heading-6'>Thông tin chi tiết Course</div>
            </div>
            <NavLink to={`/edu/school/course/preview/${id}`} className={`${listView.filter(e => !e.parentId).every(e => e.valid) ? 'button-primary' : 'button-grey'} row`} style={{ padding: '0.6rem 1.2rem' }}>
                <FilledSendMessage color={listView.filter(e => !e.parentId).every(e => e.valid) ? 'white' : undefined} />
                <div className='button-text-3'>Xuất bản khóa học</div>
            </NavLink>
        </div>
        <div className='details-view-body row' style={{ width: '100%', height: '100%', flex: 1 }}>
            <div className='details-view-body-sidebar col'>
                <Text className='heading-7'>{data?.name}</Text>
                <div className='col' >
                    {listView.filter(e => {
                        if (selectedView.parentId === e.slug) e.isExpand = true
                        return !e.parentId;
                    }).map((item, index) => {
                        const children = listView.filter(e => e.parentId === item.slug)
                        item.isExpand ??= children.some(e => e.isExpand)
                        return <div key={`sidebar-tile-${index}`} className='col' style={{ width: '100%' }}>
                            <NavLink to={children.length ? null : `/edu/${item.path.replace(':id', id)}`} className={`row details-sidebar-tile ${selectedView?.slug === item.slug ? 'selected' : ''}`}
                                onClick={() => {
                                    if (children.length) {
                                        item.isExpand = !item.isExpand
                                        setSelectedView(selectedView)
                                    }
                                }}
                            >
                                <Checkbox style={{ borderRadius: '50%' }} size={'2rem'} disabled value={item.valid} />
                                <Text className='label-3' maxLine={1} style={{ flex: 1, with: '100%' }}>{item.name}</Text>
                                {children.length ? <FontAwesomeIcon icon={item.isExpand ? faChevronUp : faChevronDown} style={{ fontSize: '1.4rem', color: '#00204D99' }} /> : null}
                            </NavLink>
                            {children.map((child, j) => <NavLink to={`/edu/${child.path.replace(':id', id)}`} key={`sidebar-tile-${index}-${j}`} style={{ paddingLeft: '4.4rem' }} className={`row details-sidebar-tile ${selectedView?.slug === child.slug || child.isExpand ? 'selected' : ''}`}>
                                <Text className='label-3' maxLine={1} style={{ flex: 1, width: '100%' }}>{child.name}</Text>
                            </NavLink>
                            )}
                        </div>
                    })}
                </div>
            </div>
            <div className='details-view-body-content col'>
                {[
                    {
                        slug: 'lesson-content',
                        element: <FormEditLesson courseData={data} />
                    },
                    {
                        slug: 'lessons',
                        element: <CourseCurriculum data={data} onChangeRequired={checkValidInforToExport} />
                    },
                    {
                        slug: 'overview',
                        element: <Overview data={data} onChangeRequired={checkValidInforToExport} />
                    },
                ].find(e => e.slug === selectedView.slug)?.element}
            </div>
        </div>
    </div>
}