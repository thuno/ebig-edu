import topicThumnailDemo from '../../../../../assets/demo-image3.png'
import { PostCard } from "../../../../../project-component/card"
import { useEffect, useState } from "react"
import { TopicController } from "../../../topic/controller"

export default function ListTopic() {
    const [data, setData] = useState([])
    useEffect(() => {
        TopicController.getListSimple({ page: 1, take: 8 }).then(res => {
            if (res) setData(res.data)
        })
    }, [])

    return <div className='row' style={{ flexWrap: 'wrap', gap: '3.2rem', width: '100%', alignItems: 'stretch' }}>
        {data.map((item, i) => {
            return <PostCard
                key={'topic-' + i}
                className={`col col6 ${i < 8 ? i < 6 ? 'col6-md col8-sm col8-min' : 'col6-md col0-sm col0-min' : "col0-md col0-sm col0-min"}`}
                to={`courses?topicId=${item.id}`}
                style={{ '--gutter': '3.2rem', gap: '2rem' }}
                imgUrl={topicThumnailDemo}
                imgStyle={{ height: '20rem' }}
                title={item.name}
            />
        })}
    </div>
}