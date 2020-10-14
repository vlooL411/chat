import React, { createRef } from 'react'

import Password from '../../../components/Sign/Password'

export default { title: 'Components/Sign/Password' }

export const Default = () => <Password ref={createRef()} />

