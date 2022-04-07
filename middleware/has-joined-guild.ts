import { Middleware, Context } from '@nuxt/types'
import { Modal } from '~/types'

const requiredRouteNames = ['my-guild']

const hasJoinedGuild: Middleware = ({ redirect, route, app }: Context) => {
  if (
    requiredRouteNames.includes(route.name as string) &&
    !app.$accessor.member.member
  ) {
    app.$accessor.modal.openModal(Modal.JoinAGuildWarning)

    return redirect('/')
  }
}

export default hasJoinedGuild
