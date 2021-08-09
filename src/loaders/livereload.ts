export const liveReloadServer = async (
  app: any,
  directories: Array<string>
): Promise<void> => {
  if (process.env.NODE_ENV == 'dev') {
    let livereload = (await import('livereload')).default
    let liveReloadServer = livereload.createServer({
      exts: ['pug', 'js', 'css', 'html'],
    })

    liveReloadServer.watch(directories)
    liveReloadServer.server.once('connection', () => {
      setTimeout(() => {
        liveReloadServer.refresh('/')
      }, 100)
    })

    let connectLiveReload = (await import('connect-livereload')).default

    app.use(connectLiveReload())
    console.log(`
      ########################################
      ║ 🗡  Live reload [ pug, css, js ]  🗡   ║
      ########################################`)
  }
}
