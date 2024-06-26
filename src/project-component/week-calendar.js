import { useEffect, useState } from "react"

const now = new Date()
const WeekCalendar = ({
    onlyDate = false,
    /* minTime >= 0 & minTime <= maxTime*/
    minTime = 0,
    /* maxTime <= 24 & maxTime >= minTime*/
    maxTime = 24,
    /* required object contain props {time: Date, duration: number, } */
    listData = [],
    initDate = now,
    style,
    titleOnlyWeekDay = false,
    renderUIInTime = () => <div></div>
}) => {
    const [list, setList] = useState([])
    const getDayTitle = (i) => {
        switch (i) {
            case 0:
                return 'CN'
            case 1:
                return 'T2'
            case 2:
                return 'T3'
            case 3:
                return 'T4'
            case 4:
                return 'T5'
            case 5:
                return 'T6'
            case 6:
                return 'T7'
            default:
                return ''
        }
    }

    useEffect(() => {
        minTime = Math.floor(minTime)
        maxTime = Math.floor(maxTime)
        setList(listData)
    }, [listData])

    return <div className="row week-calendar" style={style}>
        <div className="col time-line-container">
            {Array.from({ length: maxTime - minTime }).map((_, i) => <div key={'time-in-day-' + i} className="row">
                <div className="row label-3" >{i > 0 ? `${i + minTime}:00` : ''}</div>
                <div className="time-line" ></div>
            </div>)}
        </div>
        <div className="col event-time-infor-container" style={{ width: '100%' }}>
            <div className="row">
                {onlyDate ?
                    <div className="col date-time-col label-3" style={{ height: 'fit-content' }}>{`${getDayTitle(initDate.getDay())}${titleOnlyWeekDay ? '' : ` ngày ${initDate.getDate()}`}`}</div>
                    : Array.from({ length: 7 }).map((_, i) => {
                        const timeValue = new Date(initDate.getFullYear(), initDate.getMonth(), i - initDate.getDay() + initDate.getDate())
                        return <div key={'dtwk-' + i} className={`col date-time-col label-3 ${timeValue.getDay() === now.getDay() ? 'today' : ''}`} style={{ height: 'fit-content' }}>
                            {getDayTitle(i) + (titleOnlyWeekDay ? '' : ` ngày ${timeValue.getDate() < 10 ? `0${timeValue.getDate()}` : timeValue.getDate()}/${(timeValue.getMonth() + 1) < 10 ? `0${(timeValue.getMonth() + 1)}` : (timeValue.getMonth() + 1)}`)}
                        </div>
                    })}
            </div>
            {onlyDate ?
                <div className="col date-time-col" style={{ height: `${(maxTime - minTime) * 6 * 0.8}rem` }}>
                    {list.filter(e => (typeof e.time === "number" ? (new Date(e.time)) : e.time).getDay() === initDate.getDay()).map((e, j) => {
                        let convertTime = typeof e.time === "number" ? (new Date(e.time)) : e.time
                        let endMinutes = convertTime.getMinutes() + ((e.duration ?? 0) % 60)
                        let endTime = convertTime.getHours() + Math.floor((e.duration ?? 0) / 60)
                        if (endMinutes >= 60) {
                            endTime++
                            endMinutes -= 60
                        }
                        return <div key={'block-event-' + j} className="col block-event" style={{ top: `${((convertTime.getHours() - minTime) * 60 + convertTime.getMinutes()) * 0.08}rem`, height: `${(e.duration ?? 0) * 0.08}rem` }}>
                            {renderUIInTime(e)}
                        </div>
                    })}
                </div>
                : <div className="row" style={{ height: `${(maxTime - minTime) * 6 * 0.8}rem` }}>
                    {Array.from({ length: 7 }).map((_, i) => <div key={'time-range-' + i} className="col date-time-col" style={{ height: '100%' }}>
                        {list.filter(e => (typeof e.time === "number" ? (new Date(e.time)) : e.time).getDay() === i).map((e, j) => {
                            let convertTime = typeof e.time === "number" ? (new Date(e.time)) : e.time
                            let endMinutes = convertTime.getMinutes() + ((e.duration ?? 0) % 60)
                            let endTime = convertTime.getHours() + Math.floor((e.duration ?? 0) / 60)
                            if (endMinutes >= 60) {
                                endTime++
                                endMinutes -= 60
                            }
                            return <div key={'block-event-' + j} className="col block-event" style={{ top: `${((convertTime.getHours() - minTime) * 60 + convertTime.getMinutes()) * 0.08}rem`, height: `${(e.duration ?? 0) * 0.08}rem` }}>
                                {renderUIInTime(e)}
                            </div>
                        })}
                    </div>)}
                </div>
            }

        </div>
    </div>
}

export default WeekCalendar