const { notarize } = require("@electron/notarize");

module.exports = async (context) => {
  if (process.platform !== "darwin") return;

  if (!process.env.CI) {
    return;
  }

  if (!("APPLE_ID" in process.env && "APPLE_ID_PASS" in process.env)) {
    return;
  }

  const appId = "com.electron.app";

  const { appOutDir } = context;

  const appName = context.packager.appInfo.productFilename;

  try {
    await notarize({
      appBundleId: appId,
      appPath: `${appOutDir}/${appName}.app`,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLEIDPASS,
    });
  } catch (error) {
    console.error(error);
  }
};
