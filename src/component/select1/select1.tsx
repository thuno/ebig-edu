import React, { CSSProperties, FocusEvent } from 'react'
import {
    faChevronDown,
    faChevronUp,
    faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactDOM from 'react-dom'
import './select1.css'

interface ObjWithKnownKeys {
    id: string | number,
    name: string,
    title?: string
}

interface Select1Props {
    value?: any,
    options: Required<Array<ObjWithKnownKeys>>,
    onChange?: Function,
    placeholder?: string,
    disabled?: boolean,
    className?: string,
    helperText?: string,
    helperTextColor?: string,
    style?: CSSProperties,
    searchPlaceholder?: string,
    hideSearch?: boolean,
    handleSearch?: (e: string) => Promise<Array<ObjWithKnownKeys>>
};

interface Select1State {
    value?: string | number,
    offset: DOMRect,
    isOpen: boolean,
    onSelect: any,
    search?: Array<ObjWithKnownKeys>,
    style?: Object
};

export class Select1 extends React.Component<Select1Props, Select1State> {
    constructor(props: Select1Props) {
        super(props)
        this.state = {
            value: this.props.value,
            offset: {
                x: 0,
                y: 0,
                height: 0,
                width: 0,
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                toJSON: function () {
                    throw new Error('Function not implemented.')
                }
            },
            isOpen: false,
            onSelect: null,
        }
        this.parseValue = this.parseValue.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
        this.search = this.search.bind(this)
    }

    private parseValue(value: any) {
        if (value === null || value === undefined || value === '') {
            return null
        }
        switch (typeof this.props.options[0].id) {
            case 'number':
                return parseFloat(value)
            default:
                return value
        }
    }

    componentDidUpdate(prevProps: Select1Props, prevState: Select1State) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                ...this.state,
                value: this.props.value
            })
        }
        if (prevState.isOpen !== this.state.isOpen && this.state.isOpen) {
            const thisPopupRect = document.body.querySelector('.select1-popup')?.getBoundingClientRect()
            if (thisPopupRect) {
                let style: { top?: string, left?: string, right?: string, bottom?: string, width?: string, height?: string } | undefined;
                if (thisPopupRect.right > document.body.offsetWidth) {
                    style = {
                        top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                        width: `${this.state.offset.width}px`,
                        right: document.body.offsetWidth - this.state.offset.right + 'px'
                    }
                }
                if (thisPopupRect.bottom > document.body.offsetHeight) {
                    style = style ? {
                        ...style,
                        top: undefined,
                        bottom: document.body.offsetHeight - this.state.offset.bottom + 'px'
                    } : {
                        left: this.state.offset.x + 'px',
                        width: `${this.state.offset.width}px`,
                        bottom: document.body.offsetHeight - this.state.offset.bottom + 'px'
                    }
                }
                if (style) this.setState({ ...this.state, style: style })
            }
        }
    }

    private onChangeValue(ev: FocusEvent) {
        if (this.state.onSelect?.classList?.contains('select1-tile')) {
            const item = this.props.options.find(e => e.id === this.parseValue(this.state.onSelect.id))
            this.setState({
                ...this.state,
                isOpen: false,
                onSelect: null,
                value: item?.id
            })
            if (this.props.onChange) this.props.onChange(item)
        } else if (this.state.onSelect) {
            (ev.target as HTMLInputElement).focus()
        } else {
            this.setState({
                ...this.state,
                isOpen: false,
                onSelect: null
            })
        }
    }

    private search(ev: React.ChangeEvent<HTMLInputElement>) {
        if (ev.target.value.trim().length) {
            if (this.props.handleSearch) {
                this.props.handleSearch(ev.target.value.trim()).then(res => {
                    this.setState({
                        ...this.state,
                        search: res
                    })
                })
            } else {
                this.setState({
                    ...this.state,
                    search: this.props.options.filter(e => e.name.toLowerCase().includes(ev.target.value.trim().toLowerCase()))
                })
            }
        } else {
            this.setState({
                ...this.state,
                search: undefined
            })
        }
    }

    render() {
        const selectedValue: ObjWithKnownKeys | undefined = (this.props.options ?? []).find(e => e.id === this.state.value)
        return <div
            className={`select1-container row ${this.props.className ?? 'placeholder-2'} ${this.props.disabled ? 'disabled' : ''} ${this.props.helperText?.length && 'helper-text'}`}
            helper-text={this.props.helperText}
            style={this.props.style ? { ...({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties), ...this.props.style } : ({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties)}
            onClick={ev => {
                if (!this.state.isOpen) {
                    let _offset = ((ev.target as HTMLElement).closest('.select1-container') ?? (ev.target as HTMLElement)).getBoundingClientRect()
                    if (_offset.bottom + 32 > document.body.offsetHeight) {
                        this.setState({
                            ...this.state,
                            isOpen: true,
                            offset: _offset,
                            style: {
                                left: _offset.x + 'px',
                                bottom: (document.body.offsetHeight - _offset.y) + 'px',
                                width: `${_offset.width / 10}rem`
                            }
                        })
                    } else {
                        this.setState({
                            ...this.state,
                            isOpen: true,
                            offset: _offset,
                            style: undefined
                        })
                    }
                }
            }}
        >
            {selectedValue?.name ? (<div className='select1-value-name'>{selectedValue.name}</div>) : (<div className='select1-placeholder'>{this.props.placeholder}</div>)}
            <FontAwesomeIcon
                icon={this.state.isOpen ? faChevronUp : faChevronDown}
                style={{ fontSize: '1.2rem', color: '#888' }}
            />
            {this.state.isOpen &&
                ReactDOM.createPortal(
                    <div
                        className='select1-popup col'
                        style={this.state.style ?? {
                            top: this.state.offset.y + this.state.offset.height + 2 + 'px',
                            left: this.state.offset.x + 'px',
                            width: this.state.offset.width,
                        }}
                        onMouseOver={ev => {
                            this.setState({
                                ...this.state,
                                onSelect: ev.target
                            })
                        }}
                        onMouseOut={() =>
                            this.setState({
                                ...this.state,
                                onSelect: null
                            })
                        }
                    >
                        <div className='row header-search' style={this.props.hideSearch ? { marginTop: '-4rem' } : undefined}>
                            <input autoFocus={true} placeholder={this.props.searchPlaceholder ?? 'Tìm kiếm'}
                                onChange={this.search}
                                onBlur={ev => {
                                    this.onChangeValue(ev)
                                }}
                            />
                            <FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.2rem', color: '#161D24D9' }} />
                        </div>
                        <div className='col select1-body'>
                            <div className='col select1-scroll-view'>
                                {(this.state.search ?? this.props.options).map(item => (
                                    <button type='button' key={item.id} className='select1-tile label-3 row' id={`${item.id}`} style={{ backgroundColor: selectedValue?.id === item.id ? 'var(--selected-background)' : '#00000000' }}>
                                        {item.title ?? item.name}
                                    </button>
                                ))}
                                {(this.state.search?.length === 0 || this.props.options?.length === 0) && (
                                    <div className='no-results-found'>No result found</div>
                                )}
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    }
}
