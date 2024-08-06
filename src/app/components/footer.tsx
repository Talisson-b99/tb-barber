const Footer = () => {
  return (
    <footer className="border-t px-5 py-5">
      <span className="text-sm">
        &copy; {new Date().getFullYear()} Copyright{' '}
        <span className="font-bold">FSW Barber</span>
      </span>
    </footer>
  )
}

export default Footer
