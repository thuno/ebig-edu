import { NavLink } from "react-router-dom";
import { FilledBell, FilledSocialSharing, FilledTimeAlarm } from "../../../assets/const/icon";
import './schedule.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import avatarDemo2 from '../../../assets/demo-avatar2.png';

export default function EduSchedule() {
              const [openSchedule, setOpenSchedule] = useState(true)
              const [selectedTab, setSelectedTab] = useState(0)
              const eventList = [
                            {
                                          title: 'Toán cao cấp đại học',
                                          content: 'Buổi 15: Lý thuyết đại cương phần tổng quan',
                                          link: '',
                                          note: '',
                                          time: new Date().getTime(),
                            },
                            {
                                          title: 'Coach 1:1 Nguyễn Minh Nguyệt',
                                          content: 'Buổi 1: Giới thiệu',
                                          link: '',
                                          note: 'Chấm bài bạn Nguyệt',
                                          time: 1706689800000
                            },
                            {
                                          title: 'Toán cao cấp đại học',
                                          content: 'Buổi 16: Kiểm tra học phần',
                                          link: '',
                                          note: 'Chuẩn bị dụng cụ dạy học',
                                          time: 1706702400000
                            },
              ]

              return <div className="edu-schedule col view-container">
                            <div className="view-header row">
                                          <div className="heading-4">Giảng dạy</div>
                                          <div className="suffix-btn row">
                                                        <div className="row" style={{ width: '1.6rem', height: '1.6rem' }}><FilledTimeAlarm /></div>
                                                        <div className="button-text-3">Tạo nhắc nhở</div>
                                          </div>
                            </div>
                            <div className='block-view col'>
                                          <div className='block-title row'>
                                                        <div className="heading-7">Sắp diễn ra</div>
                                                        <NavLink to={'/edu-management/schedule/note/all'} className='button-text-3'>Xem tất cả nhắc nhở</NavLink>
                                          </div>
                                          <div className='row list-card'>
                                                        {
                                                                      eventList.sort((a, b) => {
                                                                                    const now = new Date().getTime()
                                                                                    return Math.abs(a.time - now) - Math.abs(b.time - now)
                                                                      }).map((e, i) => {
                                                                                    const eTime = new Date(e.time)
                                                                                    return <div key={`card-${i}`} className={`card-view-1 row ${i === 0 ? 'col12' : 'col6'} col24-lg col24-md col24-sm col24-min`} style={{ '--gutter': '2.4rem', columnGap: '4rem', padding: '2.8rem 2.4rem' }}>
                                                                                                  <div className='row text-content' style={{ columnGap: 40 }}>
                                                                                                                {i === 0 ? <div className='col' style={{ rowGap: 4 }}>
                                                                                                                              <div className='heading-4'>{`${eTime.getHours() > 9 ? eTime.getHours() : `0${eTime.getHours()}`}:${eTime.getMinutes() > 9 ? eTime.getMinutes() : `0${eTime.getMinutes()}`}`}</div>
                                                                                                                              <div className='subtitle-3'>{`${eTime.getDate()} tháng ${eTime.getMonth() + 1}`}</div>
                                                                                                                </div> : null}
                                                                                                                <div className='col text-content'>
                                                                                                                              <div className='heading-7'>{e.title}</div>
                                                                                                                              <div className='subtitle-4'>{e.content}</div>
                                                                                                                              {i === 0 ? null : <div className='body-3' style={{ marginTop: 4 }}>{e.note}</div>}
                                                                                                                </div>
                                                                                                  </div>
                                                                                                  {i === 0 ? <NavLink className='card-button-2 row'>
                                                                                                                <div className='row' style={{ width: '1.6rem', height: '1.6rem' }}><FilledSocialSharing color='white' /></div>
                                                                                                                <div className='button-text-3'>Vào dạy</div>
                                                                                                  </NavLink> : <div className='noti row'>
                                                                                                                <FilledBell width={15} height={15} color='#366AE2' />
                                                                                                  </div>}
                                                                                    </div>;
                                                                      })
                                                        }

                                          </div>
                            </div>
                            <div className='block-view col'>
                                          <div className='block-title row'>
                                                        <button type="button" className="row title-btn" style={{ columnGap: '1.2rem', cursor: 'pointer' }} onClick={() => { setOpenSchedule(!openSchedule) }}>
                                                                      <div className="heading-5">Tất cả lịch dạy</div>
                                                                      <FontAwesomeIcon icon={openSchedule ? faChevronDown : faChevronUp} size="1x" color="#00204DCC" />
                                                        </button>
                                                        <div className="tab-header row">
                                                                      <div className={`tab-btn label-4 row ${selectedTab === 0 ? 'selected' : ''}`} onClick={() => setSelectedTab(0)}>Ngày</div>
                                                                      <div className={`tab-btn label-4 row ${selectedTab === 1 ? 'selected' : ''}`} onClick={() => setSelectedTab(1)}>Tuần</div>
                                                                      <div className={`tab-btn label-4 row ${selectedTab === 2 ? 'selected' : ''}`} onClick={() => setSelectedTab(2)}>Tháng</div>
                                                        </div>
                                          </div>
                                          <div className="tab-view" style={{ width: '100%', height: 360, backgroundColor: 'var(--background)' }}></div>
                            </div>
                            <div className='block-view col'>
                                          <div className='block-title row'>
                                                        <div className="heading-5">Đặt lịch mentor</div>
                                                        <NavLink to={'/edu-management/schedule/mentor-schedule/all'} className='button-text-3'>Xem tất cả</NavLink>
                                          </div>
                                          <div className="row list-card-view">
                                                        {
                                                                      [
                                                                                    {
                                                                                                  title: 'Coach 1:1 Phân tích dữ liệu dành cho beginner',
                                                                                                  time: '5 buổi từ 18/09/2023',
                                                                                                  student: {
                                                                                                                avatar: avatarDemo2,
                                                                                                                name: 'Nguyễn Minh Nguyệt'
                                                                                                  },
                                                                                                  timeLimit: '19:00 - 20:00',
                                                                                                  schedule: 'Thứ 3, thứ 6 hàng tuần',
                                                                                    },
                                                                                    {
                                                                                                  title: 'Coach 1:1 Design mobile app by Figma',
                                                                                                  time: '4 buổi từ 02/06/2023',
                                                                                                  student: {
                                                                                                                avatar: avatarDemo2,
                                                                                                                name: 'Nguyễn Minh Nguyệt'
                                                                                                  },
                                                                                                  timeLimit: '14:00 - 15:30',
                                                                                                  schedule: 'Thứ 2, thứ 4 hàng tuần',
                                                                                    },
                                                                      ].map((e, i) => <div key={`card-view-${i}`} className='card-view-2 row col12' style={{ '--gutter': '2.4rem' }}>
                                                                                    <div className="col card-content-1 col16-xxl col24">
                                                                                                  <div className="col" style={{rowGap: '1.2rem'}} >
                                                                                                                <div className="col" style={{ rowGap: 4, paddingBottom: '1.2rem' }}>
                                                                                                                              <div className="heading-7">{e.title}</div>
                                                                                                                              <div className="subtitle-4">{e.time}</div>
                                                                                                                </div>
                                                                                                                <div className="row" style={{ columnGap: 4 }}>
                                                                                                                              <div className="prefix-avatar-user" style={{ backgroundImage: `url(${e.student.avatar})` }}></div>
                                                                                                                              <div className="label-4">{e.student.name}</div>
                                                                                                                </div>
                                                                                                  </div>
                                                                                    </div>
                                                                                    <div className="col card-content-2 col8-xxl col24">
                                                                                                  <div className="col" style={{ rowGap: 4 }}>
                                                                                                                <div className="heading-6">{e.timeLimit}</div>
                                                                                                                <div className="subtitle-4">{e.schedule}</div>
                                                                                                  </div>
                                                                                                  <div className="row" style={{columnGap: 8}}>
                                                                                                                <div className="button-text-3">Chấp nhận</div>
                                                                                                                <div className="button-text-3">Từ chối</div>
                                                                                                  </div>
                                                                                    </div>
                                                                      </div>)
                                                        }
                                          </div>
                            </div>
              </div>
}