// @ts-ignore
import * as core from '@aws/codecatalyst-adk-core';
// @ts-ignore
import * as project from '@aws/codecatalyst-project';
// @ts-ignore
import * as runSummaries from '@aws/codecatalyst-run-summaries';
// @ts-ignore
import * as space from '@aws/codecatalyst-space';

try {
    // Get inputs from the action
    const input_AwsAccessKeyId = core.getInput('AwsAccessKeyId');
    console.log(input_AwsAccessKeyId);
    const input_AwsSecretAccessKey = core.getInput('AwsSecretAccessKey');
    console.log(input_AwsSecretAccessKey);

    // Interact with CodeCatalyst entities
    console.log(`Current CodeCatalyst space ${space.getSpace().name}`);
    console.log(`Current CodeCatalyst project ${project.getProject().name}`);

    // Action Code start

    //aws cli install
    core.command('curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"');
    core.command('unzip awscliv2.zip');
    core.command('sudo ./aws/install --update');
    core.command(`aws configure set aws_access_key_id '${input_AwsAccessKeyId}'`);
    core.command(`aws configure set aws_secret_access_key '${input_AwsSecretAccessKey}'`);

    //Amazon CloudWatch install
    core.command('wget https://amazoncloudwatch-agent.s3.amazonaws.com/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm');

    // Set outputs of the action
} catch (error) {
    core.setFailed(`Action Failed, reason: ${error}`);
}
