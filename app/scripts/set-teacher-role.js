function parseArgs(argv) {
  const options = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith('--')) {
      continue;
    }

    const key = arg.slice(2);
    const value = argv[index + 1];

    if (!value || value.startsWith('--')) {
      options[key] = 'true';
      continue;
    }

    options[key] = value;
    index += 1;
  }

  return options;
}

function parseBoolean(value) {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  if (['true', '1', 'yes'].includes(normalized)) {
    return true;
  }

  if (['false', '0', 'no'].includes(normalized)) {
    return false;
  }

  return null;
}

function getRequiredOption(options, key) {
  const value = options[key];
  if (!value) {
    throw new Error(`Missing required argument: --${key}`);
  }
  return String(value);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  const host = String(options.host || process.env.YIN_HOST || 'http://localhost:3000').replace(/\/+$/, '');
  const targetUsername = getRequiredOption(options, 'target-username');
  const isTeacher = parseBoolean(options['is-teacher']);

  if (isTeacher === null) {
    throw new Error('Invalid value for --is-teacher. Use true or false.');
  }

  const roleResponse = await fetch(`${host}/api/admin/user/teacher/set/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: targetUsername,
      is_teacher: isTeacher,
    }),
  });

  if (!roleResponse.ok) {
    const responseText = await roleResponse.text();
    throw new Error(`Role update failed (${roleResponse.status}): ${responseText || 'No response body'}`);
  }

  const updated = await roleResponse.json().catch(() => null);
  const finalRole = updated && Object.prototype.hasOwnProperty.call(updated, 'is_teacher')
    ? updated.is_teacher
    : isTeacher;

  console.log(`Updated ${targetUsername}. is_teacher=${finalRole}`);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
