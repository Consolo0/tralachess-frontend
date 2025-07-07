function getProfileImageSrc(profileImage) {
  if (!profileImage) return null;

  let base64 = "";

  if (profileImage.data && Array.isArray(profileImage.data)) {
    const binaryString = profileImage.data
      .map(byte => String.fromCharCode(byte))
      .join("");
    base64 = btoa(binaryString);
  } else if (typeof profileImage === "string") {
    base64 = profileImage;
  } else {
    return null;
  }

  function base64ToBytes(b64, len = 12) {
    try {
      const bin = atob(b64.slice(0, Math.ceil((len * 4) / 3)));
      return Array.from(bin).map(c => c.charCodeAt(0));
    } catch {
      return [];
    }
  }
  const bytes = base64ToBytes(base64);

  let mime = "image/png";
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
    mime = "image/jpeg";
  } else if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
    mime = "image/png";
  } else if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
    mime = "image/gif";
  } else if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) {
    mime = "image/webp";
  }

  return `data:${mime};base64,${base64}`;
}

export default getProfileImageSrc;