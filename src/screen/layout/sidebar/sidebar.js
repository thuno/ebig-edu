import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './sidebar.css'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { OutlineCircleArrowLeft } from '../../../assets/const/icon';
import { menuList, supportModule } from '../../../assets/const/const-list';
export default function SideBar() {
              const navigate = useNavigate()
              const location = useLocation()
              const [moduleList, setModuleList] = useState(menuList)
              const [selected, setSelected] = useState([])

              const moduleTile = (item) => {
                            const children = moduleList.filter(e => e.parentId === item.id)
                            if (children.length && children.every(e => e.link !== location.pathname.substring(1))) item.hideChildren ??= true
                            return <div key={`module-tile-${item.id}`} className='col'>
                                          <NavLink className={`sidebar-module-tile row ${location.pathname.includes(item.link) && !children.length ? 'selected' : ''}`}
                                                        style={{ paddingLeft: 16 * (item.listId?.length ?? 1) }}
                                                        to={children.length ? null : item.link}
                                                        onClick={children.length ? () => {
                                                                      setModuleList(moduleList.map(e => {
                                                                                    return {
                                                                                                  ...e,
                                                                                                  hideChildren: e.id === item.id ? !item.hideChildren : e.hideChildren
                                                                                    }
                                                                      }))
                                                        } : null}
                                          >
                                                        <div className='label-3' style={{ color: '#00204DE5' }}>{item.name}</div>
                                                        {children.length ? <FontAwesomeIcon icon={item.hideChildren ? faChevronDown : faChevronUp} color='#00204D99' /> : null}
                                          </NavLink>
                                          {children.map(childItem => moduleTile(childItem))}
                            </div>
              }

              const expandBody = () => {
                            const topicModule = selected.find(e => e.parentId === 1)
                            return [
                                          <div key={'topic-module-name'} className='title heading-6'>{topicModule?.name}</div>,
                                          <div key={'module-menu'} className='module-menu col'>
                                                        {moduleList.filter(e => e.parentId === topicModule?.id).map(item => moduleTile(item))}
                                          </div>,
                                          <div key={'support-action'} className='support-action row'>
                                                        {supportModule.map((e, i) => <div key={`support-module-${i}`} className='button-text-6'>{e.name}</div>)}
                                          </div>
                            ]
              }

              useEffect(() => {
                            const pathFragment = location.pathname.split("/")
                            const newSelectedList = menuList.filter(e => {
                                          if (e.parentId === 1) e.isExpand ??= true
                                          return pathFragment.some(p => e.link.split('/').some(m => m === p));
                            })
                            setSelected(newSelectedList)
              }, [location.pathname])

              return <div className="row sidebar" expand={`${selected.find(e => e.parentId === 1)?.isExpand}`} >
                            <div className="col collapse" >
                                          <div className='col' >
                                                        {moduleList.filter(e => e.parentId === 1).map((item, index) => {
                                                                      const children = moduleList.filter(e => e.parentId === item.id)
                                                                      return <div key={`sidebar-item-${index}`} className={`sidebar-item ${selected.some(e => e.id === item.id) ? 'selected' : ''}`}
                                                                                    onClick={() => {
                                                                                                  if (selected.some(e => e.id === item.id)) {
                                                                                                                item.isExpand = !item.isExpand
                                                                                                                setSelected(moduleList.filter(e => {
                                                                                                                              if (e.id === item.id) {
                                                                                                                                            e.isExpand = item.isExpand
                                                                                                                                            return true
                                                                                                                              }
                                                                                                                              return e.parentId === item.id || e.listId?.includes(item.id);
                                                                                                                }))
                                                                                                  } else if (children.length) {
                                                                                                                navigate(children[0].link)
                                                                                                  } else {
                                                                                                                navigate(item.link)
                                                                                                  }
                                                                                    }}
                                                                      >
                                                                                    {selected.some(e => e.id === item.id) ? item.selectedIcon : item.icon}
                                                                      </div>
                                                        })}
                                          </div>
                                          <button type='button' className='log-out-icon'><OutlineCircleArrowLeft /></button>
                            </div>
                            {selected.length === 1 || selected.every(e => e.link !== location.pathname.substring(1)) ? null : <div className="col expand"> {expandBody()} </div>}
              </div>
}
