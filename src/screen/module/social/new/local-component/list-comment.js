import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RatingController } from "../../../edu/rating/controller"
import { Pagination, Rating, Text, TextArea } from "../../../../../component/export-component"
import { CustomerController } from "../../../customer/controller"
import { useForm } from "react-hook-form"
import { Ultis } from "../../../../../Utils"
import { OutlineChat, OutlineHeart } from "../../../../../assets/const/icon"

export default function ListComment({ rating = false }) {
    const methods = useForm({ defaultValues: { message: '', value: 0 } })
    const { id } = useParams()
    const user = CustomerController.userInfor()
    const [pageDetails, setPageDetails] = useState({ page: 1, size: 10 });
    const [data, setData] = useState()
    const [customerList, setCustomerList] = useState([])
    const [myRating, setMyRating] = useState()

    const getListCommnet = async (page, size) => {
        const res = await RatingController.getListSimple({ page: page ?? pageDetails.page, take: size ?? pageDetails.size, filter: [{ field: 'linkId', operator: '=', value: id }, { field: 'parentId', operator: "=", value: null }, { field: 'customerId', operator: "<>", value: user.id }] })
        if (res) {
            let customerIds = res.data.map(e => e.customerId)
            CustomerController.getByIds(customerIds).then(cusRes => {
                if (cusRes) setCustomerList(cusRes)
            })
            setData(res)
        }
    }

    const sendRating = async (ev) => {
        const newRating = {
            ...ev,
            dateCreated: (new Date()).getTime(),
            customerId: user?.id,
            linkId: id,
        }
        const newId = await RatingController.add(newRating)
        if (newId) {
            newRating.id = newId
            setMyRating(newRating)
        }
    }

    useEffect(() => {
        RatingController.getListSimple({ filter: [{ field: 'linkId', operator: '=', value: id }, { field: 'parentId', operator: "=", value: null }, { field: 'customerId', operator: "=", value: user.id }] }).then(res => {
            if (res?.data?.length) setMyRating(res.data[0])
        })
        getListCommnet()
    }, [])

    return <div className="col" style={{ gap: '2.4rem' }}>
        {myRating ?
            <RatingCard ratingItem={myRating} customer={user} isRating={rating} showDivider={false} user={user} /> :
            <form className="col" style={{ gap: '1.2rem' }}>
                <div className="row">
                    <div className="row" style={{ gap: '0.8rem', flex: 1, width: '100%' }}>
                        <img src={user?.avatarUrl} alt="" style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }} />
                        <Text className="label-3">{user?.name}</Text>
                    </div>
                    {rating && <Rating value={methods.watch('value')} onChange={(rate) => {
                        methods.setValue('value', rate)
                        if (!methods.getValues('message')?.length) {
                            switch (rate) {
                                case 1:
                                    methods.setValue('message', 'Rất tệ')
                                    break;
                                case 2:
                                    methods.setValue('message', 'Tệ')
                                    break;
                                case 3:
                                    methods.setValue('message', 'Bình thường')
                                    break;
                                case 4:
                                    methods.setValue('message', 'Tốt')
                                    break;
                                case 5:
                                    methods.setValue('message', 'Tuyệt vời')
                                    break;
                                default:
                                    break;
                            }
                        }
                    }} />}
                </div>
                <div className="col comment-box">
                    <TextArea
                        register={methods.register('message')}
                        name={'message'}
                        style={{ width: '100%', border: 'none', resize: 'none', padding: 0, height: '8rem' }}
                        placeholder="Bạn thấy khóa học này thế nào?"
                    />
                    <div className="row" style={{ width: '100%', justifyContent: 'end', padding: '0.4rem 1.6rem 0.8rem' }}>
                        <button type="button" className={`row ${(methods.watch('value') || !rating) && methods.watch('message') ? 'button-primary' : 'button-disabled'}`} style={{ padding: '0.6rem 1.2rem' }} onClick={methods.handleSubmit(sendRating)}>
                            <div className="button-text-3">Phản hồi</div>
                        </button>
                    </div>
                </div>
            </form>}
        {(data?.data ?? []).filter(e => !e.parentId).map((item) => {
            const customer = customerList.find(e => e.id === item.customerId)
            return <RatingCard key={item.id} ratingItem={item} customer={customer} isRating={rating} showDivider user={user} />
        })}
        <div style={{ height: 'fit-content' }}>
            <Pagination
                currentPage={pageDetails.page}
                /// pageSize
                itemPerPage={pageDetails.size}
                // data.total
                totalItem={data?.totalCount}
                /// action
                onChangePage={(page, size) => {
                    if (pageDetails.page !== page || pageDetails.size !== size) {
                        setPageDetails({ ...pageDetails, page: page, size: size });
                    }
                }}
            />
        </div>
    </div>
}

const RatingCard = ({ ratingItem, showDivider = false, isRating = false, customer, user }) => {
    const methods = useForm({ defaultValues: { message: '', value: 0 } })
    const [children, setChildren] = useState([])
    const [showReply, setShowReply] = useState(false)
    const [customerList, setCustomerList] = useState([])
    const [onReplying, setOnReplying] = useState(false)

    const getReply = async () => {
        const res = await RatingController.getListSimple({ take: 20, filter: [{ field: 'ParentId', operator: "=", value: ratingItem.id }] })
        if (res) {
            let customerIds = res.data.map(e => e.customerId).filter(id => customerList.every(e => e.id !== id))
            if (customerIds.length)
                CustomerController.getByIds(customerIds).then(cusRes => {
                    if (cusRes) setCustomerList([...customerList, ...cusRes])
                })
            setChildren(res.data)
        }
    }

    const sendReply = async (ev) => {
        const newReply = {
            ...ev,
            dateCreated: (new Date()).getTime(),
            customerId: user?.id,
            linkId: ratingItem.linkId,
            parentId: ratingItem.id
        }
        const newId = await RatingController.add(newReply)
        if (newId) {
            newReply.id = newId
            setChildren([newReply, ...children])
            setOnReplying(false)
            if (customerList.every(e => e.id !== user.id)) setCustomerList([...customerList, user])
        }
    }

    useEffect(() => {
        if (customer && customerList.every(e => e.id !== customer.id)) setCustomerList([...customerList, customer])
    }, [customer])

    return <div className="col" style={{ gap: '2.4rem' }}>
        {showDivider && <div className="col divider" style={{ width: '100%' }}></div>}
        <div className="col" style={{ gap: '0.8rem' }}>
            <div className="row">
                <div className="row" style={{ gap: '0.8rem', flex: 1, width: '100%' }}>
                    <img src={customer?.avatarUrl} alt="" style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }} />
                    <Text className="label-3">{customer?.name}</Text>
                    <Text className="label-3">.</Text>
                    <Text className="subtitle-3">{Ultis.datetoString(new Date(ratingItem.dateCreated))}</Text>
                </div>
                {isRating && <Rating value={ratingItem.value} />}
            </div>
            <Text className="body-2" maxLine={2}>{ratingItem.message}</Text>
        </div>
        <div className="row">
            <div className="row" style={{ flex: 1, gap: '0.8rem' }}>
                <OutlineHeart width="2.4rem" height="2.4rem" />
                <Text className="button-text-3">1,2k</Text>
                <Text className="label-4">.</Text>
                <button onClick={async () => {
                    if (!showReply) {
                        await getReply()
                    }
                    setShowReply(!showReply)
                }} className="row" style={{ gap: '0.8rem' }}>
                    <OutlineChat width="2.4rem" height="2.4rem" />
                    <Text className="button-text-3">{showReply ? 'Đóng bình luận' : '1,2k'}</Text>
                </button>
            </div>
            {!onReplying && <button onClick={() => { setOnReplying(true) }} className="button-text-3" style={{ color: 'var(--primary-color)' }}>Phản hồi</button>}
        </div>
        {onReplying && <form className="col" style={{ gap: '1.2rem' }}>
            <div className="row">
                <div className="row" style={{ gap: '0.8rem', flex: 1, width: '100%' }}>
                    <img src={user?.avatarUrl} alt="" style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }} />
                    <Text className="label-3">{user?.name}</Text>
                </div>
            </div>
            <div className="col comment-box">
                <TextArea
                    register={methods.register('message')}
                    name={'message'}
                    style={{ width: '100%', border: 'none', resize: 'none', padding: 0, height: '8rem' }}
                    placeholder="Bạn thấy khóa học này thế nào?"
                />
                <div className="row" style={{ width: '100%', justifyContent: 'end', padding: '0.4rem 1.6rem 0.8rem', gap: '0.4rem' }}>
                    <button type="button" className={`row ${methods.watch('message') ? 'button-primary' : 'button-disabled'}`} style={{ padding: '0.6rem 1.2rem' }} onClick={methods.handleSubmit(sendReply)}>
                        <div className="button-text-3">Phản hồi</div>
                    </button>
                </div>
            </div>
        </form>}
        {children.length && showReply ? <div className="col" style={{ paddingLeft: '2.4rem', gap: '3.2rem', borderLeft: 'var(--border-grey1)' }}>
            {children.map(child => {
                const cus = customerList.find(e => e.id === child.customerId)
                return <div key={child.id} className="col" style={{ gap: '0.8rem' }}>
                    <div className="row">
                        <div className="row" style={{ gap: '0.8rem', flex: 1, width: '100%' }}>
                            <img src={cus?.avatarUrl} alt="" style={{ width: '3.2rem', height: '3.2rem', borderRadius: '50%' }} />
                            <Text className="label-3">{cus?.name}</Text>
                            <Text className="label-3">.</Text>
                            <Text className="subtitle-3">{Ultis.datetoString(new Date(child.dateCreated))}</Text>
                        </div>
                    </div>
                    <Text className="body-2" maxLine={2}>{child.message}</Text>
                    <div className="row" style={{ paddingTop: '1.6rem', gap: '0.8rem' }}>
                        <OutlineHeart width="2.4rem" height="2.4rem" />
                        <Text className="button-text-3">1,2k</Text>
                    </div>
                </div>
            })}
        </div> : null}
    </div>
}