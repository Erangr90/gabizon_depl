export function TimeBasedHero({ name }: { name: string }) {
  const hour = new Date().getHours()
  let timeOfDay = 'morning'
  if (hour >= 5 && hour < 12) {
    timeOfDay = 'morning'
  } else if (hour >= 12 && hour < 17) {
    timeOfDay = 'afternoon'
  } else {
    timeOfDay = 'evening'
  }

  const backgrounds = {
    morning: "bg-[url('/time/morning.png')]",
    afternoon: "bg-[url('/time/afternoon.png')]",
    evening: "bg-[url('/time/evening.png')]",
  }

  const greetings = {
    morning: 'בוקר טוב',
    afternoon: 'צהריים טובים',
    evening: 'ערב טוב',
  }

  return (
    <div className='md:hidden'>
      <div className={`${backgrounds[timeOfDay]} bg-cover bg-center p-8 mb-8 relative overflow-hidden h-64`}>
        <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black opacity-70'></div>

        <div className='absolute bottom-4 right-4 text-right'>
          <h1 className='text-white text-2xl font-medium mb-2'>{greetings[timeOfDay]},</h1>
          <p className='text-white text-2xl font-semibold'>{name}</p>
        </div>
      </div>
    </div>
  )
}
