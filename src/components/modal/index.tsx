import React, {
  ComponentType,
  Suspense,
  lazy,
  createContext,
  ReactNode,
  ReactElement,
  FC,
  useState,
  useCallback,
  useImperativeHandle,
  Ref,
  forwardRef,
  ForwardRefExoticComponent,
  useContext,
} from 'react'
import { lazyComponent } from '@/core/package'
import { Button, Dialog, DialogPlugin } from 'tdesign-react/esm'
import { LoadingIcon, CloseIcon, CheckCircleFilledIcon } from 'tdesign-icons-react'
import { create } from 'zustand'
import { createRoot } from 'react-dom/client'
import './style.css'

export interface ModalContextProps {
  onClose?: () => void
}

const context = createContext<ModalContextProps>({})

export interface ModalProps {
  title?: string
  desc?: string
  trigger?: ReactElement<TriggerProps>
  children?: ReactNode | ((onClose: () => void) => ReactNode)
  component?: () => Promise<{ default: ComponentType<any> }>
  componentProps?: { [key: string]: any }
  className?: string
  width?: number
  defaultOpen?: boolean
  open?: boolean
  onClose?: () => void
}

interface TriggerProps {
  onClick: () => void
}

const ModalComp = forwardRef<ModalContextProps, ModalProps>(
  (
    { title, desc, trigger, children, component, componentProps, onClose, defaultOpen = false },
    ref
  ) => {
    const [open, setOpen] = useState(defaultOpen)
    const AsyncContent = component ? lazy(component) : undefined

    const onCloseFun = useCallback(() => {
      setOpen(false)
      onClose?.()
    }, [onClose])

    useImperativeHandle(ref, () => ({
      onClose: onCloseFun,
    }))

    return (
      <>
        {React.isValidElement(trigger) &&
          React.cloneElement(trigger, {
            onClick: () => {
              setOpen(true)
            },
          })}
        <context.Provider value={{ onClose: onCloseFun }}>
          <Dialog visible={open} onClose={onCloseFun} destroyOnClose header={title} footer={null}>
            {component ? (
              <Suspense>
                {AsyncContent && <AsyncContent {...componentProps} onClose={onCloseFun} />}
              </Suspense>
            ) : typeof children === 'function' ? (
              children(onCloseFun)
            ) : (
              children
            )}
          </Dialog>
        </context.Provider>
      </>
    )
  }
)

ModalComp.displayName = 'Modal'

export const openModal = (props: ModalProps) => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const root = createRoot(div)
  root.render(
    <Modal
      {...props}
      defaultOpen={true}
      onClose={() => {
        document.body.removeChild(div)
        props?.onClose?.()
      }}
    />
  )
}

export const useModal = () => {
  return useContext(context)
}

export interface ModalFooterProps {
  children?: ReactNode
}
const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div className='t-dialog__footer'>{children}</div>
}

type ModalType = typeof ModalComp & {
  Footer: typeof ModalFooter
}

export const Modal = ModalComp as ModalType
Modal.Footer = ModalFooter
