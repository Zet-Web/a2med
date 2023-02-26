import { dictionary } from 'shared/constants/crumbsDictionary'

export const getCrumbs = (pathname: string) => {
  const routes = pathname.slice(1).split('/')

  // TODO доработать, если будем использовать query
  const crumbRoutes = routes.map((subpath, index) => {
    return {
      href: '/' + routes.slice(0, index + 1).join('/'),
      label: getFromDictionary(subpath),
    }
  })

  return [{ href: '/', label: 'Главная' }, ...crumbRoutes]
}

export const getFromDictionary = (subpath: string): string =>
  dictionary.find(word => word.href.includes(subpath))?.label ||
  subpath
