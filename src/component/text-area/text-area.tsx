import React, { CSSProperties, ReactNode } from "react";
import './text-area.css'

interface TextAreaProps {
              value?: string,
              maxLength?: number,
              defaultValue?: string,
              onChange?: React.ChangeEventHandler<HTMLTextAreaElement>,
              onBlur?: React.FocusEventHandler<HTMLTextAreaElement>,
              onFocus?: React.FocusEventHandler<HTMLTextAreaElement>,
              placeholder?: string,
              disabled?: boolean,
              readOnly?: boolean,
              className?: string,
              helperText?: string,
              name?: string,
              helperTextColor?: string,
              style?: CSSProperties,
}

export class TextArea extends React.Component<TextAreaProps> {
              render(): React.ReactNode {
                            const padding = this.props.style?.padding
                            delete this.props.style?.padding
                            return <div
                                          className={`text-area-container row ${this.props.className ?? 'placeholder-2'} ${this.props.helperText?.length && 'helper-text'}`}
                                          style={this.props.style ? { ...({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties), ...this.props.style } : ({ '--helper-text-color': this.props.helperTextColor ?? '#e14337' } as CSSProperties)}
                            >
                                          <textarea
                                                        // autoComplete={autoComplete ? 'on' : 'new-password'}
                                                        style={{ padding: padding ?? '1.6rem' }}
                                                        maxLength={this.props.maxLength}
                                                        name={this.props.name}
                                                        defaultValue={this.props.defaultValue}
                                                        value={this.props.value}
                                                        placeholder={this.props.placeholder}
                                                        readOnly={this.props.readOnly}
                                                        disabled={this.props.disabled}
                                                        onChange={this.props.onChange}
                                                        onFocus={this.props.onFocus}
                                                        onBlur={this.props.onBlur}
                                          />
                            </div>
              }
}