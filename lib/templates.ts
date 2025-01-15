export interface Template {
  id: string
  name: string
  backgroundImage: string
  defaultSettings: {
    fontSize: number
    xAxis: number
    yAxis: number
    rotation: number
    color: string
  }
}

export const templates: Template[] = [
  {
    id: 'classic',
    name: 'Classic Brown',
    backgroundImage: '/book1.png',
    defaultSettings: {
      fontSize: 30,
      xAxis: 260,
      yAxis: 450,
      rotation: 0,
      color: '#381d13'
    }
  },
  {
    id: 'marble',
    name: 'Dark Marble',
    backgroundImage: '/book2.png',
    defaultSettings: {
      fontSize: 35,
      xAxis: 60,
      yAxis: 260,
      rotation: 9,
      color: '#262626'
    }
  },
  {
    id: 'clean',
    name: 'Clean Paper',
    backgroundImage: '/book3.png',
    defaultSettings: {
      fontSize: 30,
      xAxis: 170,
      yAxis: 360,
      rotation: 18,
      color: '#000000'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal Dots',
    backgroundImage: '/book4.png',
    defaultSettings: {
      fontSize: 35,
      xAxis: 95,
      yAxis: 370,
      rotation: 0,
      color: '#262626'
    }
  }
]

