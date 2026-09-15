type NavLink = {
    label: string
    href: string
    exact?: boolean
}

type NavColumn = {
    heading: string
    links: readonly NavLink[]
}
