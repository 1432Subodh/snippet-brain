import { ColorSwitcher } from '@/components/setting/Appearance/color-switcher'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
import React from 'react'

async function page() {
    await new Promise((resolve) => setTimeout(resolve, 10000))

  return (
    <div >
      <Button>subodh</Button>

      <p className='text-card-foreground'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo ipsam consequuntur eius aspernatur illo. Eveniet molestias ea perferendis quos sint iusto, eaque quae odio eligendi exercitationem voluptatibus sit laboriosam illo et eos impedit unde!</p>

      <ColorSwitcher/>
    </div>
  )
}

export default page