import * as Dialog from '@radix-ui/react-dialog';
import {FC, PropsWithChildren} from "react";
import {Typography} from "@/components/ui/typography";
import s from './dialogsModal.module.scss'
import {Card} from "@/components/ui/card";
import {CloseSvg} from "@/assets/components/close.tsx";

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
  title: string
  className?: string
} & PropsWithChildren

export const DialogsModal: FC<Props> = (props) => {

  const {open, setOpen, title, className, children} = props

  return (<Dialog.Root open={open}  onOpenChange={setOpen}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.overlay} forceMount/>
      <div className={`${s.modal} ${className}` }>
        <Dialog.Content className={s.window} forceMount>
          <Card className={s.card}>
            <div className={s.headerBlock}>
              <Typography variant={'h2'} as={'span'} className={s.title}>
                {title}
              </Typography>
              <Dialog.Close asChild className={s.close}>
                <button type='button'>
                  <CloseSvg/>
                </button>
              </Dialog.Close>
            </div>
            <div className={s.content}>{children}
            </div>
          </Card>
        </Dialog.Content>
      </div>
    </Dialog.Portal>
  </Dialog.Root>)
};
