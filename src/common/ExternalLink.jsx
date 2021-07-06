const ExternalLink = itemUrl => {
  console.log(itemUrl)
  return (
    <a href={itemUrl} rel='noreferrer' target='_blank' className=' float-right'>
      <i className='fa fa-external-link' aria-hidden='true'></i>
    </a>
  )
}

export default ExternalLink
